import { useEffect, useState, useRef } from 'react';


const setting = () => {
    const [count, setCount] = useState(0);
    const counterRef = useRef(null);
  
    useEffect(() => {
      const targetNumber = 30000; // 30k+
      const increment = targetNumber / 1200; // Điều chỉnh số tăng dần mỗi lần
      let currentNumber = 0;
      
      const handleScroll = () => {
        if (counterRef.current) {
          const rect = counterRef.current.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
            // Khi phần tử xuất hiện trên màn hình
            let interval = setInterval(() => {
              currentNumber += increment;
              if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(interval);
              }
              setCount(Math.floor(currentNumber)); // Cập nhật số
            }, 5);
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
        <div>
            <section class="py-10 bg-slate-900 sm:py-16 lg:py-24">
                <div class="max-w-2xl mx-auto py-20 text-center">
                    <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Data policy</h2>
                    <p class="max-w-2xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Our data policy is committed to protecting your privacy and the security of your personal information.
                        We only collect and use information necessary to provide the best service to you.
                        All information is stored securely and in full compliance with current security regulations.</p>
                </div>
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div className="relative flex items-center justify-center mx-auto">
                                {/* Main SVG with subtle hover scale */}
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                                </svg>
                                {/* Inner SVG icon */}
                                <svg className="absolute text-blue-600 w-9 h-9 transition-transform duration-700 group-hover:scale-125" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">
                                Secured Payments
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z" />
                                </svg>
                                <svg class="absolute text-orange-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Fast & Easy to Load                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg class="absolute text-green-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Light & Dark Version                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="66" height="68" viewBox="0 0 66 68" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z" />
                                </svg>
                                <svg class="absolute text-purple-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Light & Dark Version                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="65" height="70" viewBox="0 0 65 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z" />
                                </svg>
                                <svg class="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Fast & Easy to Load                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="78" height="78" viewBox="0 0 78 78" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z" />
                                </svg>
                                <svg class="absolute text-yellow-500 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Secured Payments                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="62" height="64" viewBox="0 0 62 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z"></path>
                                </svg>
                                <svg class="absolute text-gray-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Light & Dark Version                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="72" height="75" viewBox="0 0 72 75" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z" />
                                </svg>
                                <svg class="absolute text-rose-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Secured Payments                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>

                        <div className='group relative p-4 transition-all duration-500 border border-transparent hover:border-red-500'>
                            <div class="relative flex items-center justify-center mx-auto">
                                <svg className="text-blue-100 transition-transform duration-500 group-hover:scale-105" width="62" height="65" viewBox="0 0 62 65" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 13.0264C0 33.4609 8.06546 64.0264 28.5 64.0264C48.9345 64.0264 62 50.4604 62 30.0259C62 9.59135 59.4345 4.0256 39 4.0256C18.5655 4.0256 0 -7.40819 0 13.0264Z" />
                                </svg>

                                <svg class="absolute text-lime-600 w-9 h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold text-white relative inline-block">Fast & Easy to Load                                 <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </h3>
                            <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <section class="py-10 bg-slate-900 sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                                Trusted by <span ref={counterRef} className="text-blue-600">{count.toLocaleString()}k+</span> world class companies & design teams
                            </h2>
                        </div>

                        <div class="grid max-w-xl grid-cols-1 mx-auto mt-8 text-center lg:max-w-full sm:mt-12 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-6">
                            <div class="overflow-hidden bg-slate-300 rounded-md shadow">
                                <div class="px-8 py-12">
                                    <div class="relative w-24 h-24 mx-auto">
                                        <img class="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-1.jpg" alt="" />
                                        <div class="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                                            <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <blockquote class="mt-7">
                                        <p class="text-lg text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                                    </blockquote>
                                    <p class="text-base font-semibold tex-tblack mt-9">Jenny Wilson</p>
                                    <p class="mt-1 text-base text-gray-600">Project Manager at Microsoft</p>
                                </div>
                            </div>

                            <div class="relative overflow-hidden bg-slate-300 rounded-md shadow transition-all duration-500 hover:text-white group">
                                <div class="absolute inset-0 bg-black transition-all duration-500 transform scale-0 group-hover:scale-150"></div>
                                <div class="relative px-8 py-12 transition-colors duration-500 group-hover:text-white">
                                    <div class="relative w-24 h-24 mx-auto">
                                        <img class="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg" alt="" />
                                        <div class="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                                            <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <blockquote class="mt-7">
                                        <p class="text-lg text-black group-hover:text-white transition-colors duration-500">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                                    </blockquote>
                                    <p class="text-base font-semibold mt-9 text-black group-hover:text-white transition-colors duration-500">Robert Fox</p>
                                    <p class="mt-1 text-base text-gray-600 group-hover:text-gray-400 transition-colors duration-500">Founder at Brain.co</p>
                                </div>
                            </div>


                            <div class="overflow-hidden bg-white rounded-md shadow">
                                <div class="px-8 py-12">
                                    <div class="relative w-24 h-24 mx-auto">
                                        <img class="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-3.jpg" alt="" />
                                        <div class="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                                            <svg class="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <blockquote class="mt-7">
                                        <p class="text-lg text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                                    </blockquote>
                                    <p class="text-base font-semibold tex-tblack mt-9">Kristin Watson</p>
                                    <p class="mt-1 text-base text-gray-600">UX Designer at Google</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>

            <section>
                <section class="py-10 bg-slate-900 sm:py-16 lg:py-24">
                    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                        <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>

                        <div class="flow-root mt-12 sm:mt-16">
                            <div class="divide-y divide-gray--200 -my-9">
                                <div class="py-9">
                                    <p class="text-xl font-semibold text-white">How to create an account?</p>
                                    <p class="mt-3 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
                                    <p class="mt-3 text-base text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>

                                <div class="py-9">
                                    <p class="text-xl font-semibold text-white">What payment method do you support?</p>
                                    <p class="mt-3 text-base text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam.</p>
                                </div>

                                <div class="py-9">
                                    <p class="text-xl font-semibold text-white">What payment method do you support?</p>
                                    <p class="mt-3 text-base text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>

                                <div class="py-9">
                                    <p class="text-xl font-semibold text-white">How do you provide support?</p>
                                    <p class="mt-3 text-base text-gray-600">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt <a href="#" title="" class="text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">SticketMovie@gmail.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>

            <section>
                <section class="pt-10 pb-8 overflow-hidden bg-slate-900 sm:pt-16 lg:pt-24">
                    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div class="max-w-2xl mx-auto text-center">
                            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Connect with all apps</h2>
                            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                            <a
                                href="#"
                                title=""
                                class="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 border-2 border-gray-200 rounded-md mt-9 hover:bg-gray-900 hover:text-white hover:border-gray-900 focus:bg-gray-900 focus:text-white focus:border-gray-900"
                                role="button"
                            >
                                Check all apps
                            </a>
                        </div>
                    </div>

                    <img class="w-full min-w-full mx-auto mt-12 scale-150 max-w-7xl lg:min-w-0 lg:mt-0 lg:scale-100" src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/1/services-icons.png" alt="" />
                </section>

            </section>

            <section>
                <section class="pt-10 bg-slate-900 sm:pt-16 lg:pt-24">
                    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div class="max-w-2xl mx-auto text-center">
                            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">Real humans are here to help you building your brand</h2>
                            <p class="mt-6 text-lg text-gray-900">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
                            <a href="/cinema/contact" title="" class="inline-flex items-center justify-center px-6 py-4 mt-12 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:bg-blue-700" role="button">
                                <svg class="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact our support
                            </a>
                        </div>
                    </div>

                    <div class="container mx-auto 2xl:px-12">
                        <img class="w-full mt-6" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/4/group-of-people.png" alt="" />
                    </div>
                </section>

            </section>

        </div>
    );
};

export default setting;