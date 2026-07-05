import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiSend,
} from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'

import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

type FieldName = 'name' | 'email' | 'subject' | 'message'
type FormValues = Record<FieldName, string>
type FormErrors = Partial<Record<FieldName, string>>
type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const { t } = useTranslation()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validate = (input: FormValues): FormErrors => {
    const result: FormErrors = {}
    if (!input.name.trim()) result.name = t('contact.form.validation.nameRequired')
    if (!input.email.trim()) result.email = t('contact.form.validation.emailRequired')
    else if (!EMAIL_PATTERN.test(input.email)) {
      result.email = t('contact.form.validation.emailInvalid')
    }
    if (!input.subject.trim()) result.subject = t('contact.form.validation.subjectRequired')
    if (!input.message.trim()) result.message = t('contact.form.validation.messageRequired')
    else if (input.message.trim().length < 10) {
      result.message = t('contact.form.validation.messageTooShort')
    }
    return result
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear the field error as soon as the visitor starts fixing it
    setErrors((prev) => (prev[name as FieldName] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.values(validationErrors).some(Boolean)) return

    setStatus('sending')
    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(`Formspree responded with ${response.status}`)
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (field: FieldName) =>
    cn(
      'w-full rounded-xl border bg-surface px-4 py-3 text-sm transition-colors outline-none',
      'placeholder:text-muted/60 focus:border-primary',
      errors[field] ? 'border-red-400' : 'border-border',
    )

  const contactInfo = [
    {
      label: t('contact.emailLabel'),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      Icon: FiMail,
    },
    {
      label: t('contact.locationLabel'),
      value: t('contact.locationValue'),
      href: null,
      Icon: FiMapPin,
    },
  ]

  const socials = [
    { href: siteConfig.social.github, label: 'GitHub', Icon: FiGithub },
    { href: siteConfig.social.linkedin, label: 'LinkedIn', Icon: FiLinkedin },
    { href: siteConfig.social.medium, label: 'Medium', Icon: SiMedium },
  ]

  return (
    <section id="contact" className="section-pad bg-surface/40">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Direct contact info */}
          <Reveal className="space-y-4 lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
              {t('contact.infoTitle')}
            </h3>
            {contactInfo.map(({ label, value, href, Icon }) => (
              <div key={label} className="card flex items-center gap-4 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-muted uppercase">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-medium break-all transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <h3 className="pt-2 text-sm font-semibold tracking-wider text-foreground uppercase">
              {t('contact.socialLabel')}
            </h3>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Contact form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3 py-10 text-center"
                    role="status"
                  >
                    <FiCheckCircle aria-hidden="true" className="h-12 w-12 text-emerald-500" />
                    <h3 className="text-lg font-bold">{t('contact.form.successTitle')}</h3>
                    <p className="max-w-sm text-sm text-muted">{t('contact.form.successText')}</p>
                    <Button variant="outline" onClick={() => setStatus('idle')} className="mt-2">
                      {t('contact.form.sendAnother')}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={(event) => void handleSubmit(event)}
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
                          {t('contact.form.name')}
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={handleChange}
                          placeholder={t('contact.form.namePlaceholder')}
                          className={fieldClass('name')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        />
                        {errors.name && (
                          <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
                          {t('contact.form.email')}
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder={t('contact.form.emailPlaceholder')}
                          className={fieldClass('email')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        />
                        {errors.email && (
                          <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
                        {t('contact.form.subject')}
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={values.subject}
                        onChange={handleChange}
                        placeholder={t('contact.form.subjectPlaceholder')}
                        className={fieldClass('subject')}
                        aria-invalid={Boolean(errors.subject)}
                        aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      />
                      {errors.subject && (
                        <p id="contact-subject-error" className="mt-1.5 text-xs text-red-400">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={values.message}
                        onChange={handleChange}
                        placeholder={t('contact.form.messagePlaceholder')}
                        className={cn(fieldClass('message'), 'resize-y')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-400/40 bg-red-400/10 p-3.5 text-sm"
                      >
                        <FiAlertTriangle
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                        />
                        <div>
                          <p className="font-semibold">{t('contact.form.errorTitle')}</p>
                          <p className="mt-0.5 text-muted">
                            {t('contact.form.errorText', { email: siteConfig.email })}
                          </p>
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={status === 'sending'}
                      className="mt-6 w-full sm:w-auto"
                    >
                      {status === 'sending' ? (
                        <>
                          <FiLoader aria-hidden="true" className="animate-spin" />
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        <>
                          <FiSend aria-hidden="true" />
                          {t('contact.form.submit')}
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
