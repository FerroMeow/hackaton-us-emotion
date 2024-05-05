# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn, options
from firebase_admin import initialize_app, credentials, storage
from cv2 import imread, cvtColor, CascadeClassifier, COLOR_BGR2GRAY, rectangle, imwrite
from keras import config, models, preprocessing
from numpy import expand_dims
from os import remove

#App init
cred = credentials.Certificate("test-85b39-firebase-adminsdk-5641d-b22f416523.json")
initialize_app(cred, {'storageBucket':'storageBucket'})
bucket = storage.bucket()

@https_fn.on_request(region="us-central1", cors=options.CorsOptions(cors_origins="*",cors_methods=["options","get",'post','put']))
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    if(req.method=='POST'):
        #download the image
        file_url = req.json['data']['image']
        file_name = file_url.split("/")[-1]
        blob = bucket.blob(file_url)
        blob.download_to_filename(file_name)
        #load the image and detect faces
        image = imread(file_name)
        image_gray=cvtColor(image,COLOR_BGR2GRAY)
        face_detection = CascadeClassifier("haarcascade_frontalface_alt.xml")
        detection = face_detection.detectMultiScale(image_gray)
        image_detected = image
        colors = [
            (0,0,255),
            (0,255,0),
            (255,0,0),
            (0,255,255),
            (255,255,0),
            (255,0,255),
        ]
        i=0
        labels = ["Anger","Disgust","Fear","Happiness","Contempt","Sadness","Surprise"]
        predictions = {}
        config.disable_traceback_filtering()
        model = models.load_model('my_model.keras')
        for(col,row,width,height) in detection:
            rectangle(image_detected,(col,row),(col+width,row+height),colors[i%len(colors)],2)
           
            cropped = image[row:(row+height),col:(col+width)]
            imwrite('cropped'+str(i)+file_name,cropped)
            im = preprocessing.image.load_img('cropped'+str(i)+file_name,target_size=(48,48),color_mode='grayscale')
            arr = preprocessing.image.img_to_array(im)
            arr = expand_dims(arr,axis=0)

            pred = model.predict(arr,verbose=0)
            print(pred)
            predictions[i] = {'color':'','result':''}
            predictions[i]['color'] = colors[i%len(colors)]
            predictions[i]['result']={labels[j]:str(pred[0][j]) for j in range(len(labels))}
            remove('cropped'+str(i)+file_name)
            i+=1
        imwrite("detected_"+file_name,image_detected)
        blob_detected = bucket.blob("tmp/detected_"+file_name)
        blob_detected.upload_from_filename("detected_"+file_name)
        remove("detected_"+file_name)
        remove(file_name)
        
        return {'data':{'img_name':"tmp/detected_"+file_name,'predictions':predictions}}
    return {}

