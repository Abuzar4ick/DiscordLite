import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface FieldErrors {
  email?: string;
  username?: string;
  password?: string;
}

const VALIDATION_ERROR_TIMEOUT_MS = 10_000;

const Signup = () => {
  const {
    isSigningUp,
    signupSuccessMessage,
    signupEmail,
    error,
    signup,
    clearError,
    resetSignupState,
  } = useAuthStore();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const validationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearValidationTimer = () => {
    if (validationTimerRef.current) {
      clearTimeout(validationTimerRef.current);
      validationTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearValidationTimer();
      resetSignupState();
    };
  }, [resetSignupState]);

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (!trimmedUsername) {
      errors.username = "Username is required.";
    }

    if (password.length < 6) {
      errors.password = "Must be at least 6 characters long.";
    }

    return errors;
  };

  const handleFieldChange = (field: keyof FieldErrors, value: string) => {
    if (error) {
      clearError();
    }

    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (field === "email") setEmail(value);
    if (field === "username") setUsername(value);
    if (field === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      clearValidationTimer();
      setFieldErrors(errors);
      validationTimerRef.current = setTimeout(() => {
        setFieldErrors({});
        validationTimerRef.current = null;
      }, VALIDATION_ERROR_TIMEOUT_MS);
      return;
    }

    clearValidationTimer();
    setFieldErrors({});
    await signup({
      email: email.trim(),
      username: username.trim(),
      password,
    });
  };

  const handleUseDifferentEmail = () => {
    clearValidationTimer();
    setFieldErrors({});
    resetSignupState();
    setPassword("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#1e1f22] px-4 py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(88,101,242,0.38),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(71,82,196,0.32),transparent_45%)]"
      />

      <div className="card relative z-10 w-full max-w-[480px] border border-[#1e1f22] bg-[#313338] text-[#f2f3f5] shadow-2xl">
        <div className="card-body gap-5 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5865f2] text-white shadow-md">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02ZM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12Zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#f2f3f5]">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-[#b5bac1]">
              We&apos;re so excited to see you join!
            </p>
          </div>

          {signupSuccessMessage ? (
            <div className="flex flex-col gap-4">
              <div role="alert" className="alert alert-success text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-semibold">{signupSuccessMessage}</p>
                  {signupEmail && (
                    <p className="text-xs opacity-90">
                      Check your inbox at{" "}
                      <span className="font-medium">{signupEmail}</span> to
                      verify your account.
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleUseDifferentEmail}
                className="btn btn-ghost btn-sm text-[#b5bac1] hover:bg-[#3f4147] hover:text-white"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend w-full text-xs font-bold tracking-wide uppercase text-[#b5bac1]">
                  <span>
                    Email <span className="text-error">*</span>
                  </span>
                </legend>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  disabled={isSigningUp}
                  className={`input w-full border-none bg-[#1e1f22] text-[#f2f3f5] placeholder:text-[#80848e] focus:outline-2 focus:outline-[#5865f2] ${
                    fieldErrors.email ? "input-error outline-1 outline-error" : ""
                  }`}
                />
                {fieldErrors.email && (
                  <p className="fieldset-label text-xs font-medium text-error">
                    {fieldErrors.email}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend w-full text-xs font-bold tracking-wide uppercase text-[#b5bac1]">
                  <span>
                    Username <span className="text-error">*</span>
                  </span>
                </legend>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="cool_user"
                  value={username}
                  onChange={(e) => handleFieldChange("username", e.target.value)}
                  disabled={isSigningUp}
                  className={`input w-full border-none bg-[#1e1f22] text-[#f2f3f5] placeholder:text-[#80848e] focus:outline-2 focus:outline-[#5865f2] ${
                    fieldErrors.username ? "input-error outline-1 outline-error" : ""
                  }`}
                />
                {fieldErrors.username && (
                  <p className="fieldset-label text-xs font-medium text-error">
                    {fieldErrors.username}
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend w-full text-xs font-bold tracking-wide uppercase text-[#b5bac1]">
                  <span>
                    Password <span className="text-error">*</span>
                  </span>
                </legend>
                <label
                  className={`input w-full border-none bg-[#1e1f22] text-[#f2f3f5] focus-within:outline-2 focus-within:outline-[#5865f2] ${
                    fieldErrors.password ? "input-error outline-1 outline-error" : ""
                  }`}
                >
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => handleFieldChange("password", e.target.value)}
                    disabled={isSigningUp}
                    className="grow placeholder:text-[#80848e]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="btn btn-ghost btn-xs text-[#b5bac1] hover:bg-transparent hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </label>
                {fieldErrors.password && (
                  <p className="fieldset-label text-xs font-medium text-error">
                    {fieldErrors.password}
                  </p>
                )}
              </fieldset>

              <button
                type="submit"
                disabled={isSigningUp}
                className="btn mt-2 w-full border-none bg-[#5865f2] font-medium text-white hover:bg-[#4752c4] disabled:bg-[#5865f2]/60 disabled:text-white/70"
              >
                {isSigningUp ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Creating account...
                  </>
                ) : (
                  "Continue"
                )}
              </button>

              <p className="mt-1 text-xs text-[#949ba4]">
                By registering, you agree to receive a verification email to
                activate your account.
              </p>
            </form>
          )}

          <div className="text-sm text-[#949ba4]">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="link link-hover font-medium text-[#00a8fc]"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
