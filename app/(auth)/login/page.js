import LoginForm from "@/components/auth/LoginForm";
import SocialLogins from "@/components/auth/SocialLogins";

const LoginPage = () => {
  return (
    <section className="h-screen grid place-items-center  bg-[url('/login-hero.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md bg-white">
        <h4 className="font-bold text-2xl">Sign in</h4>
        <LoginForm />
        <SocialLogins mode={'login'}/>
      </div>
    </section>
  )
}

export default LoginPage;