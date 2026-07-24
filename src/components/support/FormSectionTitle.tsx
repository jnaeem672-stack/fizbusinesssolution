import type { FormSectionTitleProps } from '@/types';

const FormSectionTitle = ({ children }: FormSectionTitleProps) => (
  <div className="col-span-full mb-1">
    <h3 className="text-[11px] font-semibold text-primary uppercase tracking-[1px] border-b border-gray-100 pb-2">
      {children}
    </h3>
  </div>
);

export default FormSectionTitle;
