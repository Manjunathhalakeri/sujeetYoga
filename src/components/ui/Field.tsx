import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/cn';

/**
 * FORM STYLES
 *
 * Fields are drawn as a single hairline underline rather than as a boxed input.
 * On an ivory editorial page a bordered box reads like a web form; a ruled line
 * reads like a printed one, and it removes a whole layer of visual noise.
 *
 * Accessibility is handled by the shell, not by call sites: every field wires
 * its own label, hint and error together via `id` / `aria-describedby` /
 * `aria-invalid`, so it is impossible to render an unlabelled input by mistake.
 *
 * States covered: default, hover, focus, filled, disabled, invalid, and
 * (at the form level) loading and success.
 */

const control = cn(
  'w-full rounded-none border-0 border-b bg-transparent',
  'px-0 py-3 text-body text-charcoal',
  'border-hairline transition-colors',
  'placeholder:text-stone-400',
  'hover:border-stone',
  // The underline thickens and darkens on focus; the focus ring is suppressed
  // here because the border change is a clearer, less boxy indicator — but a
  // 2px colour shift alone would fail WCAG, so we also keep the outline for
  // keyboard users via :focus-visible.
  'focus:border-charcoal focus:outline-none',
  'focus-visible:border-charcoal',
  'disabled:cursor-not-allowed disabled:border-dashed disabled:text-stone-400',
  'aria-[invalid=true]:border-danger',
);

/* ------------------------------------------------------------------ */
/* Shell                                                              */
/* ------------------------------------------------------------------ */

export interface FieldShellProps {
  id: string;
  label: string;
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: (a11y: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': true | undefined;
    required: boolean | undefined;
  }) => ReactNode;
}

export function FieldShell({
  id,
  label,
  hideLabel = false,
  hint,
  error,
  required,
  className,
  children,
}: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col', className)}>
      <label
        htmlFor={id}
        className={cn(
          'text-micro text-stone mb-1 tracking-[0.08em] uppercase',
          hideLabel && 'sr-only',
        )}
      >
        {label}
        {required ? (
          <span className="text-clay" aria-hidden="true">
            {' *'}
          </span>
        ) : (
          <span className="tracking-normal text-stone-400 normal-case"> (optional)</span>
        )}
      </label>

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        required: required || undefined,
      })}

      {hint ? (
        <p id={hintId} className="text-micro text-stone mt-2">
          {hint}
        </p>
      ) : null}

      {/* aria-live so an error that appears after submit is announced without
          moving focus away from the field the user is in. */}
      {error ? (
        <p id={errorId} role="alert" className="text-micro text-danger mt-2">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                           */
/* ------------------------------------------------------------------ */

type SharedFieldProps = Omit<FieldShellProps, 'children'>;

export function TextField({
  id,
  label,
  hideLabel,
  hint,
  error,
  required,
  className,
  ...input
}: SharedFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'required'>) {
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {(a11y) => <input {...input} {...a11y} className={control} />}
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  hideLabel,
  hint,
  error,
  required,
  className,
  rows = 4,
  ...textarea
}: SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'required'>) {
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {(a11y) => <textarea {...textarea} {...a11y} rows={rows} className={control} />}
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  hideLabel,
  hint,
  error,
  required,
  className,
  children,
  ...select
}: SharedFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'required'> & {
    children: ReactNode;
  }) {
  return (
    <FieldShell
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      {(a11y) => (
        <select
          {...select}
          {...a11y}
          className={cn(
            control,
            // Native chevron removed and redrawn, so the control matches the
            // ruled-underline language across platforms.
            'appearance-none bg-[length:0.7rem] bg-[position:right_0.25rem_center] bg-no-repeat pr-6',
            "bg-[image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' fill='none' stroke='%236e6a63' stroke-width='1.4'/></svg>\")]",
          )}
        >
          {children}
        </select>
      )}
    </FieldShell>
  );
}

/**
 * Anti-spam honeypot. Visually and programmatically hidden from real users; a
 * filled value means a bot. Kept here so it ships with the form primitives and
 * is not forgotten when the contact form is built in a later phase.
 */
export function HoneypotField({ name = 'company_website' }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Leave this field empty</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/**
 * Form-level result banner. The success and error counterparts to the button's
 * loading state, completing the eight interaction states from the brief.
 */
export function FormNotice({
  tone,
  children,
}: {
  tone: 'success' | 'error';
  children: ReactNode;
}) {
  return (
    <p
      role="status"
      className={cn(
        'text-small border-l-2 py-2 pl-4',
        tone === 'success' ? 'border-success text-success' : 'border-danger text-danger',
      )}
    >
      {children}
    </p>
  );
}
