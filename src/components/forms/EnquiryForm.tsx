'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  FormNotice,
  HoneypotField,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/ui/Field';
import { programs } from '@/content/programs';
import {
  emptyEnquiry,
  hasErrors,
  notConnectedSubmitter,
  validateEnquiry,
  type EnquiryFieldErrors,
  type EnquiryPayload,
  type EnquirySubmitter,
} from '@/lib/enquiry';

/**
 * ENQUIRY FORM — UI only.
 *
 * This component knows how to collect, validate and present. It does NOT know
 * how to send. Sending is injected via the `submit` prop, typed as
 * `EnquirySubmitter`, so adding a backend later means passing a different
 * function — no changes in here.
 *
 * States covered, per the brief: default, focus (via the Field primitives),
 * required, invalid, loading, success and error.
 *
 * Validation behaviour: errors appear on submit, not on every keystroke —
 * validating while someone is still typing their email tells them they are
 * wrong before they have finished being right. Once a field has an error it
 * re-validates as they fix it, so the error clears as soon as it is resolved.
 */
export interface EnquiryFormProps {
  /** Injected sender. Defaults to the honest no-op that reports it is not wired. */
  submit?: EnquirySubmitter;
  /** Preselect a programme, e.g. from a detail page CTA. */
  defaultProgramme?: string;
}

export function EnquiryForm({
  submit = notConnectedSubmitter,
  defaultProgramme = '',
}: EnquiryFormProps) {
  const uid = useId();
  const [values, setValues] = useState<EnquiryPayload>({
    ...emptyEnquiry,
    programme: defaultProgramme,
  });
  const [errors, setErrors] = useState<EnquiryFieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  // Only re-validate on change once a submit has surfaced errors.
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof EnquiryPayload>(key: K, value: EnquiryPayload[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateEnquiry(next));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setFormError('');

    const found = validateEnquiry(values);
    setErrors(found);
    if (hasErrors(found)) {
      setStatus('idle');
      // Move focus to the first field in error so a keyboard or screen-reader
      // user is taken to the problem rather than left at the submit button.
      const firstKey = Object.keys(found)[0];
      if (firstKey) document.getElementById(`${uid}-${firstKey}`)?.focus();
      return;
    }

    // Honeypot: a bot filled the hidden field. Fail silently — showing an error
    // would teach the bot what tripped it.
    if (values.company) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    try {
      const result = await submit(values);
      if (result.ok) {
        setStatus('success');
        setValues({ ...emptyEnquiry, programme: defaultProgramme });
        setSubmitted(false);
      } else {
        setStatus('error');
        setFormError(result.error);
      }
    } catch {
      setStatus('error');
      setFormError('Something went wrong. Please try again, or write to us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rule-t pt-8">
        <p className="text-display-2 font-display max-w-[18ch] text-balance">
          Thank you — your enquiry has been sent.
        </p>
        <p className="text-lead text-stone mt-6 max-w-[42ch]">
          Placeholder confirmation copy. TODO: confirm the wording and the expected reply
          time.
        </p>
        <div className="mt-8">
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <HoneypotField name={`${uid}-company`} />

      <TextField
        id={`${uid}-name`}
        name="name"
        label="Your name"
        required
        autoComplete="name"
        value={values.name}
        error={errors.name}
        onChange={(e) => update('name', e.target.value)}
      />

      <TextField
        id={`${uid}-email`}
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        hint="We reply from a real inbox — never a mailing list."
        value={values.email}
        error={errors.email}
        onChange={(e) => update('email', e.target.value)}
      />

      <TextField
        id={`${uid}-phone`}
        name="phone"
        type="tel"
        label="Phone or WhatsApp"
        autoComplete="tel"
        value={values.phone}
        error={errors.phone}
        onChange={(e) => update('phone', e.target.value)}
      />

      <SelectField
        id={`${uid}-programme`}
        name="programme"
        label="What are you interested in"
        value={values.programme}
        onChange={(e) => update('programme', e.target.value)}
      >
        <option value="">Not sure yet</option>
        {programs.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.title}
          </option>
        ))}
      </SelectField>

      <TextAreaField
        id={`${uid}-message`}
        name="message"
        label="Your message"
        required
        rows={5}
        hint="Anything useful — experience, injuries, preferred timings."
        value={values.message}
        error={errors.message}
        onChange={(e) => update('message', e.target.value)}
      />

      {status === 'error' && formError ? (
        <FormNotice tone="error">{formError}</FormNotice>
      ) : null}

      {submitted && hasErrors(errors) ? (
        <FormNotice tone="error">
          Please check the highlighted fields and try again.
        </FormNotice>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          loading={status === 'loading'}
          loadingLabel="Sending…"
          className="sm:w-auto"
          block
        >
          Send enquiry
        </Button>
        <p className="text-micro text-stone-400 sm:max-w-[28ch]">
          We use your details only to reply to this enquiry.
        </p>
      </div>
    </form>
  );
}
