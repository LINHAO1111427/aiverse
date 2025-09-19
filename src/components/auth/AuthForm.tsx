'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Eye, EyeOff, Mail, Lock, User, Chrome, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

interface AuthFormProps {
  mode: 'login' | 'register'
  locale?: string
  redirectTo?: string
  error?: string
}

export default function AuthForm({ mode, locale = 'en', redirectTo = '/', error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('auth')
  const tCommon = useTranslations('common')
  const isZh = locale === 'zh'

  const isLogin = mode === 'login'
  const schema = isLogin ? loginSchema : registerSchema

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true)
    
    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (result?.error) {
          toast.error(t('invalidCredentials'))
        } else {
          toast.success(t('welcomeBack'))
          router.push(redirectTo)
          router.refresh()
        }
      } else {
        // Register user
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: (data as RegisterFormData).name,
            email: data.email,
            password: data.password,
          }),
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Registration failed')
        }

        // Automatically sign in after registration
        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (result?.error) {
          toast.error(t('registrationSuccess'))
        } else {
          toast.success(t('accountCreated'))
          router.push(`/${locale}/onboarding`)
          router.refresh()
        }
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('somethingWrong'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: redirectTo })
    } catch (error) {
      toast.error(t('googleSignInFailed'))
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? t('welcomeBack') : t('createAccount')}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? t('enterCredentials')
              : t('enterDetails')
            }
          </CardDescription>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center space-x-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">
                {error === 'CredentialsSignin' ? t('invalidCredentials') : t('somethingWrong')}
              </span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Chrome className="h-4 w-4" />
            <span>{t('continueWithGoogle')}</span>
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t('orContinueWith')}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">{t('firstName')} {t('lastName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('enterFullName')}
                    className="pl-10"
                    {...register('name')}
                  />
                </div>
                {'name' in errors && errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterEmail')}
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('enterPassword')}
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('enterConfirmPassword')}
                    className="pl-10"
                    {...register('confirmPassword')}
                  />
                </div>
                {'confirmPassword' in errors && errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isLogin ? t('signingIn') : t('signingUp')}</span>
                </div>
              ) : (
                <span>{isLogin ? t('signIn') : t('createAccount')}</span>
              )}
            </Button>
          </form>

          <div className="text-center text-sm">
            {isLogin ? (
              <p>
                {t('noAccount')}{' '}
                <Link href={`/${locale}/auth/signup`} className="text-primary hover:underline">
                  {t('signUp')}
                </Link>
              </p>
            ) : (
              <p>
                {t('haveAccount')}{' '}
                <Link href={`/${locale}/auth/signin`} className="text-primary hover:underline">
                  {t('signIn')}
                </Link>
              </p>
            )}
          </div>

          {isLogin && (
            <div className="text-center">
              <Link href={`/${locale}/auth/forgot-password`} className="text-sm text-primary hover:underline">
                {t('forgotPassword')}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}