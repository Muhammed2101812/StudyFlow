import React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef(
  (
    {
      label,
      id,
      error,
      helpText,
      icon,
      iconPosition = 'left',
      className,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={id}
            ref={ref}
            className={clsx(
              'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm',
              {
                'pl-10': icon && iconPosition === 'left',
                'pr-10': icon && iconPosition === 'right',
                'border-red-300': hasError,
                'border-gray-300': !hasError,
              },
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
        </div>
        {hasError && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {!hasError && helpText && (
          <p className="mt-1 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;