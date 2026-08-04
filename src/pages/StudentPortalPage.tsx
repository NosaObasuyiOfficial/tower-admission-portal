// import HeroSection from '../components/HeroSection'
import StudentLoginForm from '../components/StudentLoginForm'

function StudentPortalPage() {
  return (
       <>
      <div className="flex flex-col min-h-screen h-full w-full overflow-x-hidden">
        {/* <HeroSection portalName={"admission"} /> */}

        <div className="h-full grow">
          <StudentLoginForm onLogin={undefined} />
        </div>
      </div>
    </>
  )
}

export default StudentPortalPage