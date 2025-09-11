import { PasswordInputs } from "./components/PasswordInputs";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Establecer nueva contraseña</h2>
        <form className="mt-8 space-y-6">
          <PasswordInputs />
        </form>
      </div>
    </div>
  );
}