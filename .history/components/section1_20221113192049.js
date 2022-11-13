import Image from 'next/image'
import Link from 'next/link'
import Author from './_child/author'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore ,{Autoplay} from 'swiper';
import 'swiper/css';
import fetcher from '../lib/fetcher'
import Spinner from './_child/spinner'
import Error from './_child/error'



export default function Section1() {
  const{data,isLoading,isError}=fetcher('api/posts')

  if(isLoading) return <Spinner></Spinner>;
  if(isError) return <Error></Error>
  

    SwiperCore.use([Autoplay])


    const bg={
        background:"url('/images/banner.png') no-repeat",
        backgroundPosition:"right"
    }



  return (
    <section className="py-16 "style={bg}>
   <div className="container mx-auto md:px-20">
    <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>
    <Swiper
    
      slidesPerView={1}
      loop={true}
      autoplay={
        {
            delay:5000
        }
      }
      
    >
     {
      data.map((value,index)=>(
        <SwiperSlide key={index}><Slide data={value}></Slide></SwiperSlide>
      ))
     }
      
      ...
    </Swiper>

 

   </div>
    </section>
  )
}

function Slide(){

  const{id,title,category,img,published,author}=data;
    return(
        <div className="grid md:grid-cols-2">
           <div className="image"  >
            <Link href={"/"}>  <Image src={img ||"/"}  width={600} height={600}/></Link>
     
           </div>
           <div className="info flex justify-center flex-col">
            <div className="cat">
                <Link href={"/"} className="text-orange-600 hover:text-orange-800">{category ||"Unknown"}</Link>
                <Link href={"/"} className="text-gray-800 hover:text-gray-600">-{published  ||"Unknown"}</Link>
            </div>
            <div className='title'>
        <Link href={"/"} className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">{title }</Link>
            </div>
            <p className='text-gray-500  py-3'>
            Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind 
            text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
            </p>
            <Author></Author>
           </div>
        </div>
    )
}