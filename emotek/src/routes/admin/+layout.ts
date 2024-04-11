export const prerender = true;
export const trailingSlash = 'always';
import { redirect } from '@sveltejs/kit';
import type { LayoutData } from './$types';
import { onAuthStateChanged } from 'firebase/auth';

export const load: LayoutData = async (data) => {
	const {app, auth} = await data.parent();
    const a =  await new Promise(
        (resolver) => {
            onAuthStateChanged(auth, (cred) => resolver(cred))
        }
    );
    if(a) {
        console.log('b')
    }
    else if(a==null) {
        throw redirect(301,'/login') 
        console.log('a')
    }
    
};
