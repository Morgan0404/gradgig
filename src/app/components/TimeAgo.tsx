'use client';
// @ts-ignore
import ReactTimeAgo from 'react-timeago';

export default function TimeAgo({createdAt}:{createdAt:string}){
    return(
        <>
            <ReactTimeAgo date ={createdAt}/>

        </>
    );
}