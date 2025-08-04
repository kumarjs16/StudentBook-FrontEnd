// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper'

// ** Swiper Styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Images
import img1 from '../../../assets/images/banner/img1.png'
import img2 from '../../../assets/images/banner/img2.png'
import img3 from '../../../assets/images/banner/img3.png'
import img4 from '../../../assets/images/banner/img4.png'

const params = {
  modules: [Autoplay, Navigation, Pagination],
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  },
  navigation: true
}

const SwiperBook = ({ isRtl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4' className="display-4 fw-bold text-primary" style={{ textAlign: 'center', marginBottom: '24px' }}>StudentBook AD's</CardTitle>
      </CardHeader>
      <CardBody>
        <Swiper dir={isRtl ? 'rtl' : 'ltr'} {...params} className="swiper-autoplay">
          {[img1, img2, img3, img4].map((img, index) => (
            <SwiperSlide key={index}>
             <img
  src={img}
  alt={`slide ${index + 1}`}
  className='img-fluid w-100 object-fit-cover'
  style={{ height: '350px' }} 
/>

            </SwiperSlide>
          ))}
        </Swiper>
      </CardBody>
    </Card>
  )
}

export default SwiperBook
