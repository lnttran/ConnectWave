import React, { ReactNode } from 'react'
import { Card } from './Card';


function Html() {
    return (

        <div>
            <h1 className="absolute font-logo-font font-extrabold dark:text-gray-50 text-black mt-2 ml-2 sm:text-3xl md:text-xl lg:text-9xl sm:mt-4 sm:ml-4 top-[20vh] left-[5vw]">ConnectWave</h1>
            <h2 className="relative dark:text-gray-50 text-black mt-2 ml-2 sm:text-xl sm:mt-4 sm:ml-4 font-logo-font top-[430px] left-[130px] max-w-4xl lg:text-[28px] lg:leading-8">Experience the magic of our service, designed to help your YouTube views and subscribers count grow organically. Enhance your online presence and connect with your audience effortlessly</h2>

            <div className='relative top-[100vh]'>
                <div className='flex flex-col w-[100vw] h-[100vh]'>
                    <div className='m-10 space-y-10 h-full'>
                        <h1 className=" font-logo-font font-extrabold dark:text-gray-50 text-black mt-2 ml-2 sm:text-xl md:text-5xl lg:text-[10rem] sm:mt-4 sm:ml-4 left-[20vw] max-w-4xl">What we do</h1>
                        <div className="flex flex-row w-full justify-around">
                            <Card>
                                <h1 className="font-bold lg:text-[2rem] pb-8" >Increase Youtube Subscribers </h1>
                                We are providing YouTube real subscribers. You can take advantage of both free YouTube subscribers and paid YouTube subscribers. You will get paid subscribers at a much faster speed as compared to free YouTube subscribers.
                            </Card>
                            <Card>
                                <h1 className="font-bold lg:text-[2rem] pb-8" >Increase Video Views</h1>
                                We are providing YouTube real watch hours. You can get it for free or pay a little amount and get it in an automated way. You will get paid watch hours at a much faster speed as compared to free ones.
                            </Card>

                            <Card>
                                <h1 className="font-bold lg:text-[2rem] pb-8" >Earn Money</h1>
                                When you get 1000 subscribers and 4000 watch hours from our website, then you can monetize your YouTube channel. After monetization, you will earn money from your videos.</Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Html }
