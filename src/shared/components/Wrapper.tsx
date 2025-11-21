
"use client"

interface WrapperProps {
  children: React.ReactNode;
  borderColor?: string; 
}

const Wrapper: React.FC<WrapperProps> = ({ children, borderColor = "black" }) => {
  return (
    <div className='border-2 p-5 rounded-lg m-2 grid grid-cols-3 gap-4' style={{ borderColor }}>
      {children}
    </div>
  );
};

export default Wrapper;
