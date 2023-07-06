const Footer = () => {
  return (
    <footer className="mt-auto w-full h-[150px] bg-primary text-white text-sm flex flex-col items-center">
      <div className="flex w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div>Test</div>
          <div>Test</div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          Test
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          Test
        </div>
      </div>
      <div className="h-10">Copyright © {new Date().getFullYear()}</div>
    </footer>
  );
};

export default Footer;
