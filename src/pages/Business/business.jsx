import { useState  } from 'react';

const Business = () => {

    const images = [
        "https://i.pinimg.com/564x/02/57/a0/0257a04d73d0d933f5047c76f1c38c2a.jpg",
        "https://i.pinimg.com/564x/d2/57/bd/d257bd71b950ed38f454907a277a0203.jpg",
        "https://i.pinimg.com/564x/fc/4b/f9/fc4bf9cc2da113a58e736e827bf1958f.jpg",
        "https://i.pinimg.com/736x/87/04/a0/8704a09e172e3db4645dd50d58d5e26a.jpg",
        "https://i.pinimg.com/736x/67/63/4b/67634b1be7126d690bc13c6f42bafc30.jpg",
        "https://i.pinimg.com/736x/64/49/e9/6449e92bd1c8eaffa220b8bd4767e8a6.jpg",
        "https://i.pinimg.com/564x/02/57/a0/0257a04d73d0d933f5047c76f1c38c2a.jpg",
        "https://i.pinimg.com/564x/d2/57/bd/d257bd71b950ed38f454907a277a0203.jpg",
        "https://i.pinimg.com/564x/fc/4b/f9/fc4bf9cc2da113a58e736e827bf1958f.jpg",
        "https://i.pinimg.com/736x/87/04/a0/8704a09e172e3db4645dd50d58d5e26a.jpg",
        "https://i.pinimg.com/736x/67/63/4b/67634b1be7126d690bc13c6f42bafc30.jpg",
        "https://i.pinimg.com/736x/64/49/e9/6449e92bd1c8eaffa220b8bd4767e8a6.jpg",
        "https://i.pinimg.com/564x/02/57/a0/0257a04d73d0d933f5047c76f1c38c2a.jpg",
        "https://i.pinimg.com/564x/d2/57/bd/d257bd71b950ed38f454907a277a0203.jpg",
        "https://i.pinimg.com/564x/fc/4b/f9/fc4bf9cc2da113a58e736e827bf1958f.jpg",
        "https://i.pinimg.com/736x/87/04/a0/8704a09e172e3db4645dd50d58d5e26a.jpg",
        "https://i.pinimg.com/736x/67/63/4b/67634b1be7126d690bc13c6f42bafc30.jpg",
        "https://i.pinimg.com/736x/64/49/e9/6449e92bd1c8eaffa220b8bd4767e8a6.jpg",
        "https://i.pinimg.com/564x/02/57/a0/0257a04d73d0d933f5047c76f1c38c2a.jpg",
        "https://i.pinimg.com/564x/d2/57/bd/d257bd71b950ed38f454907a277a0203.jpg",
        "https://i.pinimg.com/564x/fc/4b/f9/fc4bf9cc2da113a58e736e827bf1958f.jpg",
        "https://i.pinimg.com/736x/87/04/a0/8704a09e172e3db4645dd50d58d5e26a.jpg",
        "https://i.pinimg.com/736x/67/63/4b/67634b1be7126d690bc13c6f42bafc30.jpg",
        "https://i.pinimg.com/736x/64/49/e9/6449e92bd1c8eaffa220b8bd4767e8a6.jpg",
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);

      const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };
    
      const goToNext = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };


    return (
        <div className='mt-20 bg-gray-900'>

            <section className='w-full overflow-x-auto'>
                <div className="flex justify-center flex-col items-center text-center text-3xl text-white font-bold py-10">
                    Our Photos
                    <p className='text-base pt-3 w-2/4 text-slate-300'>
                        We have created many useful and interesting photos for you. Through these images, you can view and share them with the people you love.
                    </p>
                </div>

                <div className="flex gap-3">

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/c1/b0/89/c1b0896f8c491dd7ac90ef2dd68e0246.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/564x/61/ee/73/61ee73f40e3cbd4402b5ef0cf42bfd02.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/564x/c8/79/d6/c879d6b76317093059e88b4297d548d7.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/564x/d7/24/75/d724754d9e17f051ed537918c3e63c97.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/d0/90/53/d09053a8211dee0c27450438058283e7.jpg" />
                        </div>
                    </div>

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/29/b9/fa/29b9fa14c417cf118e5e5f31ff5417a7.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/84/67/a8/8467a8da2daa7bd912bbaef38372cb47.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/564x/2d/91/d1/2d91d12e4354cb6ae90432610b51966a.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/e6/a7/0e/e6a70e58b4a24eff34824cdbe76e634f.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img src="https://i.pinimg.com/736x/4b/b9/ee/4bb9ee5cf759c87910eb436f76888e09.jpg" />
                        </div>
                    </div>

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/3f/e8/db/3fe8db833ac28bb81046a735344aa0eb.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/6a/46/7e/6a467ec3b1efd01708d13b425ee44317.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/eb/d4/92/ebd4926597d3185e62ee4e88a9659e9d.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/89/4a/a4/894aa45df38fb045bbdce2f67c2c88bf.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/8b/8e/67/8b8e67e5a95a1591e825595169ae2922.jpg" />
                        </div>
                    </div>

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/38/72/63/387263e636cd45534a2b969bbdaf6f21.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/6a/46/7e/6a467ec3b1efd01708d13b425ee44317.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/eb/d4/92/ebd4926597d3185e62ee4e88a9659e9d.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/89/4a/a4/894aa45df38fb045bbdce2f67c2c88bf.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/8b/8e/67/8b8e67e5a95a1591e825595169ae2922.jpg" />
                        </div>
                    </div>

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/27/9d/72/279d7229d403bb33d22372f04e7b198c.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/43/e5/9a/43e59a14c3bc46b50448da7fab0f1e71.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/d8/ce/43/d8ce432ad9bcb0dc9479ace654e0b446.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/9e/9b/91/9e9b91112f9f8095fa04410f1a62073f.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/74/c7/01/74c701d9b4c9574725f668090d1431fb.jpg" />
                        </div>
                    </div>

                    <div className="carousel carousel-vertical rounded-box h-96">
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/0d/51/18/0d511852fe74af516cdfd77decd0e225.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/d1/08/54/d108540714d9d32a8f85d35514455a55.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/34/61/49/346149a1c8e060435b7d8aa518bff9b1.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/564x/e8/33/24/e8332408d5d7a2c53c5a6e4a90c1284d.jpg" />
                        </div>
                        <div className="carousel-item h-full">
                            <img className='w-full' src="https://i.pinimg.com/736x/89/4a/a4/894aa45df38fb045bbdce2f67c2c88bf.jpg" />
                        </div>
                    </div>
                </div>
            </section>

            <main className='px-16'>


                <section className="py-10  bg-slate-900 sm:py-16 lg:py-24">
                    <div>
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">What our customers say</h2>
                            <p className='text-base pt-3 w-4/4 text-slate-300'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
                            <div className="overflow-hidden bg-slate-800 rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-1.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-white truncate">Darrell Steward</p>
                                            <p className="text-sm text-white-600 truncate">@darrels</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-white">
                                            You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                                            <span className="block text-sky-500">#another</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-white rounded-md group">
                                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
                                <div className="relative px-5 py-6 z-10">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate group-hover:text-white">Leslie Alexander</p>
                                            <p className="text-sm text-gray-600 truncate group-hover:text-gray-300">@lesslie</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500 group-hover:text-sky-300">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-gray-800 group-hover:text-gray-300">
                                            Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.
                                            <span className="block text-sky-500 group-hover:text-sky-300">#Celebration</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="overflow-hidden bg-slate-800 rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-3.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-white truncate">Jenny Wilson</p>
                                            <p className="text-sm text-white-600 truncate">@jennywilson</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-white">
                                            This is a top quality product. No need to think twice before making it live on web.
                                            <span className="block text-sky-500">#make_it_fast</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-white rounded-md group">
                                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
                                <div className="relative px-5 py-6 z-10">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-4.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate group-hover:text-white">Kristin Watson</p>
                                            <p className="text-sm text-gray-600 truncate group-hover:text-gray-300">@kristinwatson2</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500 group-hover:text-sky-300">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-gray-800 group-hover:text-gray-300">
                                            Finally, I’ve found a template that covers all bases for a bootstrapped startup. We were able to launch in days, not months.
                                            <span className="block text-sky-500 group-hover:text-sky-300">#Celebration</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-white rounded-md transition-all duration-500 group">
                                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
                                <div className="relative px-5 py-6 z-10">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-5.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate group-hover:text-white">Guy Hawkins</p>
                                            <p className="text-sm text-gray-600 truncate group-hover:text-gray-300">@jennywilson</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500 group-hover:text-sky-300">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-gray-800 group-hover:text-gray-300">
                                            This is a top quality product. No need to think twice before making it live on web.
                                            <span className="block text-sky-500 group-hover:text-sky-300">#make_it_fast</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="overflow-hidden bg-slate-800 rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-6.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-white truncate">Marvin McKinney</p>
                                            <p className="text-sm text-white-600 truncate">@darrels</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-white">
                                            With Celebration, it’s quicker with the customer, the customer is more ensured of getting exactly what they ordered, and I’m all for the efficiency.
                                            <span className="block text-sky-500">#dev #tools</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>

                            <div className="relative overflow-hidden bg-white rounded-md transition-all duration-500 hover:bg-slate-800 group">
                                <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
                                <div className="relative px-5 py-6 z-10">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-7.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-black truncate group-hover:text-white">Annette Black</p>
                                            <p className="text-sm text-gray-600 truncate group-hover:text-gray-300">@darrels</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-gray-800 group-hover:text-gray-300">
                                            You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                                            <span className="block text-sky-500 group-hover:text-sky-300">#another</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>


                            <div className="overflow-hidden bg-slate-800 rounded-md">
                                <div className="px-5 py-6">
                                    <div className="flex items-center justify-between">
                                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-8.jpg" alt="" />
                                        <div className="min-w-0 ml-3 mr-auto">
                                            <p className="text-base font-semibold text-white truncate">Floyd Miles</p>
                                            <p className="text-sm text-white-600 truncate">@darrels</p>
                                        </div>
                                        <a href="#" title="" className="inline-block text-sky-500">
                                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path
                                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                    <blockquote className="mt-5">
                                        <p className="text-base text-white">
                                            My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.
                                            <span className="block text-sky-500">#Celebration</span>
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='mt-16 flex items-center'>

                    <div className="diff aspect-[16/9] w-1/2" >
                        <div className="diff-item-1">
                            <img alt="daisy" src="https://i.pinimg.com/originals/18/97/89/1897892f8f077127a69115c6e41c37d2.gif" />
                        </div>
                        <div className="diff-item-2">
                            <img
                                alt="daisy"
                                src="https://i.pinimg.com/564x/06/0b/a2/060ba29300ea8fe5dcce951628c2ef27.jpg" />
                        </div>
                        <div className="diff-resizer"></div>
                    </div>
                    <div className="w-1/2 p-8">
                        <h2 className="text-3xl text-white font-bold mb-4">Bán Vé Phim</h2>
                        <p className="text-lg">
                            Đặt vé xem phim trực tuyến với dịch vụ của chúng tôi. Tận hưởng trải nghiệm mua vé dễ dàng, chọn ghế ngồi
                            yêu thích và nhận vé qua điện thoại tại nhà.
                        </p>
                        <button className="mt-6 px-6 py-2 bg-red-600 text-white rounded-md">
                            <a href='/cinema/movie'>Đặt vé ngay</a>
                        </button>
                    </div>

                </section>

                <section className='mt-16'>

                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Blocking development</h2>
                        <p className="text-base pt-3 pb-16 w-4/4 text-slate-300">
                            We are on an exciting journey of growth, constantly evolving and striving to make meaningful progress. This path is not just about achieving success, but about learning, improving, and overcoming challenges. Join us as we navigate this road to continuous development.
                        </p>
                    </div>

                    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                        <li>
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-start mb-10 md:text-end">
                                <time className="font-mono italic">1984</time>
                                <div className="text-lg font-black">First Macintosh computer</div>
                                The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh
                                personal computer. It played a pivotal role in establishing desktop publishing as a general
                                office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed
                                in a beige case with integrated carrying handle; it came with a keyboard and single-button
                                mouse.
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end mb-10">
                                <time className="font-mono italic">1998</time>
                                <div className="text-lg font-black">iMac</div>
                                iMac is a family of all-in-one Mac desktop computers designed and built by Apple Inc. It has
                                been the primary part of Apples consumer desktop offerings since its debut in August 1998,
                                and has evolved through seven distinct forms
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-start mb-10 md:text-end">
                                <time className="font-mono italic">2001</time>
                                <div className="text-lg font-black">iPod</div>
                                The iPod is a discontinued series of portable media players and multi-purpose mobile devices
                                designed and marketed by Apple Inc. The first version was released on October 23, 2001, about
                                8+1⁄2 months after the Macintosh version of iTunes was released. Apple sold an estimated 450
                                million iPod products as of 2022. Apple discontinued the iPod product line on May 10, 2022. At
                                over 20 years, the iPod brand is the oldest to be discontinued by Apple
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-end mb-10">
                                <time className="font-mono italic">2007</time>
                                <div className="text-lg font-black">iPhone</div>
                                iPhone is a line of smartphones produced by Apple Inc. that use Apples own iOS mobile
                                operating system. The first-generation iPhone was announced by then-Apple CEO Steve Jobs on
                                January 9, 2007. Since then, Apple has annually released new iPhone models and iOS updates. As
                                of November 1, 2018, more than 2.2 billion iPhones had been sold. As of 2022, the iPhone
                                accounts for 15.6% of global smartphone market share
                            </div>
                            <hr />
                        </li>
                        <li>
                            <hr />
                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="timeline-start mb-10 md:text-end">
                                <time className="font-mono italic">2015</time>
                                <div className="text-lg font-black">Apple Watch</div>
                                The Apple Watch is a line of smartwatches produced by Apple Inc. It incorporates fitness
                                tracking, health-oriented capabilities, and wireless telecommunication, and integrates with
                                iOS and other Apple products and services
                            </div>
                        </li>
                    </ul>
                </section>

                <section className='mt-16 w-28 fixed right-0 top-16 bg-slate-600 rounded-l-md pl-1 z-50'>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">Default</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value="default" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">Retro</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value="retro" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">Cyberpunk</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value="cyberpunk" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">Valentine</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value="valentine" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">Aqua</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value="aqua" />
                        </label>
                    </div>
                </section>

            </main>

            <section className="mt-16 pb-48">
                 <div className="w-full bg-slate-900 absolute z-20 h-10 rounded-t-full rounded-b-full transform -translate-y-5"></div>

                <div className="relative w-full">
                    {/* Hiển thị các ảnh trong 1 dòng */}
                    <div className="flex gap-3 overflow-hidden">
                    {/* Đặt các ảnh vào một container để có thể chuyển động */}
                    <div
                        className="flex gap-3 transition-transform duration-700 ease-in-out"
                        style={{
                        transform: `translateX(-${currentIndex * 10}%)`,
                        }}
                    >
                        {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index}`}
                            className="w-96 h-96 object-cover"
                        />
                        ))}
                    </div>
                    </div>

                    {/* Nút Prev */}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                    <button
                        onClick={goToPrevious}
                        className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800 transition"
                    >
                        Prev
                    </button>
                    </div>

                    {/* Nút Next */}
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                    <button
                        onClick={goToNext}
                        className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800 transition"
                    >
                        Next
                    </button>
                    </div>
                </div>
                 <div className="w-full bg-slate-900 absolute z-20 h-10 rounded-t-full rounded-b-full transform -translate-y-5"></div>
            </section>

        </div>
    );
}

export default Business;
