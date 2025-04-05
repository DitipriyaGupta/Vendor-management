// components/CustomPageHeader.tsx
import React from 'react';

type HeaderProps = {
  title: string;
  subTitle?: string;
  onBack?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  subTitle,
  onBack,
}) => {
  return (
    <div className="custom-page-header ">
      {onBack && (
       <button onClick={onBack} style={{ fontSize: '1.25rem', marginRight: '1rem' ,background:"none",border:"none"}}>
       ←
     </button>
      )}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</span>
        {subTitle && <span style={{ color: '#6b7280' }}>{subTitle}</span>}
      </div>
    </div>
  );
};

export default Header;