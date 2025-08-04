import { Card, CardBody, CardTitle, CardText, CardFooter, Button } from 'reactstrap'

import video1 from '@src/assets/videos/video1.mp4'
import video2 from '@src/assets/videos/video2.mp4'
import video3 from '@src/assets/videos/video3.mp4'

const Classcard = () => {
  const classData = [
    {
      title: 'Class 6',
      text: 'Start your journey with engaging video lessons.',
      video: video1,
      updated: '5 mins ago'
    },
    {
      title: 'Class 7',
      text: 'Explore topics with fun and visual explanations.',
      video: video2,
      updated: '10 mins ago'
    },
    {
      title: 'Class 8',
      text: 'Strengthen your base with conceptual clarity.',
      video: video3,
      updated: '15 mins ago'
    },
    {
      title: 'Class 9',
      text: 'Level up with smart study and practice content.',
      video: video3,
      updated: '15 mins ago'
    },
    {
      title: 'Class 10',
      text: 'Crack your board exams with expert lessons.',
      video: video3,
      updated: '15 mins ago'
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      <h4 className="display-4 text-primary" style={{ textAlign: 'center', marginBottom: '24px' }}>Student Access</h4>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 300px)', 
      gap: '24px',
      justifyContent: 'center', 
      padding: '24px'
    }}>
      {classData.map((cls, i) => (
        <Card key={i} style={{ width: '100%' }}>
          <video controls width='100%' height='auto'>
            <source src={cls.video} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
          <CardBody>
            <CardTitle tag='h4'>{cls.title}</CardTitle>
            <CardText>{cls.text}</CardText>
            <Button color='primary' block>Subscribe</Button>
          </CardBody>
          {/* <CardFooter>
            <small className='text-muted'>Last updated {cls.updated}</small>
          </CardFooter> */}
        </Card>
      ))}
    </div>
    </div>
  )
}

export default Classcard
