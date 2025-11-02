import React from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helpText,
  disabled = false,
  required = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const showErrorIcon = error && !rightIcon;

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'input-error' : helpText ? 'input-help' : undefined}
          className={clsx(
            'block w-full rounded-lg border px-3 py-2 text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'placeholder:text-gray-400',
            leftIcon && 'pl-10',
            (rightIcon || showErrorIcon) && 'pr-10',
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
          )}
          {...props}
        />
        {showErrorIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-red-500">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
        {rightIcon && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id="input-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p id="input-help" className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
};

export default Input;
