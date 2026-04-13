import { RegisterForm } from "@/components/shared/auth/registerForm/register-form";
import { Suspense } from "react";


const RegisterPage = () => {
     return (
          <div className="h-full">
               <Suspense fallback={<div>Loading...</div>}>
                   <RegisterForm />
               </Suspense>
          </div>
     );
};

export default RegisterPage;