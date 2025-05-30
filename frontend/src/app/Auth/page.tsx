'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { loginUser, registerUser } from '@/app/store/features/authSlice';

const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
        },
    }),
};

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useAppDispatch();
    const { user, loading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const resultAction = await dispatch(loginUser({ email: formData.email, password: formData.password }));
                if (loginUser.fulfilled.match(resultAction)) {
                    toast.success('Login successful!');
                } else {
                    toast.error(
                        typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : 'Login failed'
                    );

                }
            } else {
                const resultAction = await dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }));
                if (registerUser.fulfilled.match(resultAction)) {
                    toast.success('Account created successfully!');
                } else {
                    toast.error(
                        typeof resultAction.payload === 'string'
                            ? resultAction.payload
                            : 'Registration failed'
                    );

                }
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Something went wrong.');
        }
    };

    useEffect(() => {
        if (user) {
            router.push('/Posts');
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {!isLogin && (
                                <motion.div
                                    variants={inputVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={0}
                                >
                                    <Label htmlFor="name" className="mb-3">Name</Label>
                                    <Input id="name" placeholder="Your Name" type="text" value={formData.name} onChange={handleChange} />
                                </motion.div>
                            )}
                            <motion.div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                custom={1}
                            >
                                <Label htmlFor="email" className="mb-3">Email</Label>
                                <Input id="email" placeholder="you@example.com" type="email" value={formData.email} onChange={handleChange} />
                            </motion.div>
                            <motion.div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                custom={2}
                            >
                                <Label htmlFor="password" className="mb-3">Password</Label>
                                <Input id="password" placeholder="••••••••" type="password" value={formData.password} onChange={handleChange} />
                            </motion.div>
                            <motion.div
                                variants={inputVariants}
                                initial="hidden"
                                animate="visible"
                                custom={3}
                            >
                                <Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
                                </Button>
                            </motion.div>
                        </form>
                        <p className="text-sm text-center text-gray-600 mt-6">
                            {isLogin ? 'New here?' : 'Already have an account?'}{' '}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-indigo-600 hover:underline"
                            >
                                {isLogin ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
