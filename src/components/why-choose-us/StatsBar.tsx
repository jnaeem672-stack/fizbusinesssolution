const StatsBar = () => {
  const stats = [
    { label: 'Years of Experience', value: '10+' },
    { label: 'Students Supported', value: '10,000+' },
    { label: 'Research Projects Guided', value: '350+' },
    { label: 'Support Format', value: '1-to-1' },
  ];

  return (
    <div className="bg-navy-light py-10 md:py-12">
      <div className="max-w-site mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((item, i) => (
          <div key={item.label} className="text-center relative">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 block">{item.value}</span>
            <p className="text-[10px] md:text-xs uppercase opacity-60 tracking-wider font-bold text-white">{item.label}</p>
            {i < stats.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-2 w-px h-10 bg-white/20 -translate-y-1/2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
