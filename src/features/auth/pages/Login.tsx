import { Card } from '@mantine/core';

import { LoginForm } from '../components';

const Login: React.FC = () => {
  return (
    <Card className="h-screen md:h-auto w-full md:max-w-md mx-auto" shadow="sm" radius="md" p="lg">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <img src="/images/ecoeduhealth.png" className="w-12 bg-green-500 rounded-full" alt="" />
      </div>

      <LoginForm />
    </Card>
  );
};

export default Login;
