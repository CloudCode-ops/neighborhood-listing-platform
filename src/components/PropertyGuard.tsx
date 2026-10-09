import React from 'react';
import { PropertyContractSchema, PropertyContract } from '../app/schemas/property';

interface PropertyGuardProps {
  rawData: unknown;
  children: (data: PropertyContract) => React.ReactNode;
  fallback?: React.ReactNode;
}

export const PropertyGuard: React.FC<PropertyGuardProps> = ({
  rawData,
  children,
  fallback = (
    <div className="p-4 border border-red-500 bg-red-50 text-red-700 rounded">
      Data Contract Violation: Invalid property listing record.
    </div>
  ),
}) => {
  const result = PropertyContractSchema.safeParse(rawData);

  if (!result.success) {
    console.error('Property Data Contract Violation:', result.error.format());
    return <>{fallback}</>;
  }

  return <>{children(result.data)}</>;
};