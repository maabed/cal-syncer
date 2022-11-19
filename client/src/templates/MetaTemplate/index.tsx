import type { ReactNode } from 'react';

import Meta from '@/components/Meta';

type IMetaTemplateProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const MetaTemplate = ({ title, description, children }: IMetaTemplateProps) => (
  <>
    <Meta title={title} description={description} />
    {children}
  </>
);

export default MetaTemplate;
