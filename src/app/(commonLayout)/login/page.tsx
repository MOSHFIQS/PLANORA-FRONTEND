import { LoginForm } from "@/components/shared/auth/loginForm/login-form";
import { Suspense } from "react";

const LoginPage = () => {
     return (
          <div className="h-full">
               <Suspense fallback={<div>Loading...</div>}>
                    <LoginForm />
               </Suspense>
          </div>

     );
};

export default LoginPage;