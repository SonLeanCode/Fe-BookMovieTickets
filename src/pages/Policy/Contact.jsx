import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Toastify from "../../helper/Toastify";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        email: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
        setErrors({
            ...errors,
            [id]: '', // Clear the error when user starts typing
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate each field
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Please enter your name.';
        if (!formData.location) newErrors.location = 'Please enter your country and city.';
        if (!formData.email) newErrors.email = 'Please enter your email.';
        if (!formData.message) newErrors.message = 'Please enter your message.';
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // Display errors if there are any
        } else {
            setIsLoading(true); // Set loading to true before sending the email
    
            // Parameters for EmailJS
            const serviceId = 'service_y8u0rtj';
            const templateId = 'template_bqxln0i'; // Email to you
            const publicKey = 'JEYVA7BLKzPbx1No_';
    
            const templateParams = {
                form_name: formData.name,
                form_email: formData.email,
                to_name: "Thiên Phú",
                message: formData.message,
            };
    
            // Send email to you
            emailjs.send(serviceId, templateId, templateParams, publicKey)
                .then((response) => {
                    console.log('Email sent successfully!', response.status, response.text);
                    Toastify("Email Đã Gửi Đi Thành Công!", 200);
    
                    // Now send email to user
                    const userTemplateId = 'template_n3o87kf'; // Template for the user
                    const userTemplateParams = {
                        to_email: formData.email, // Use the email from the form
                        user_name: formData.name,
                        user_message: formData.message,
                    };
    
                    // Send email to the user
                    return emailjs.send(serviceId, userTemplateId, userTemplateParams, publicKey);
                })
                .then((response) => {
                    console.log('User notification email sent successfully!', response.status, response.text);
                    Toastify("Email đã gửi tới bạn!", 200);
                })
                .catch((error) => {
                    console.error('Failed to send email:', error);
                    Toastify("Lỗi Không Gửi Mail Thành Công!", 400);
                })
                .finally(() => {
                    setIsLoading(false); // Reset loading state after sending
                    // Clear form data after successful submission
                    setFormData({
                        name: '',
                        location: '',
                        email: '',
                        message: '',
                    });
                });
        }
    };
    

    return (
        <div className="bg-gray-900 px-14">
            {/* Banner Contact */}
            <div className="bg-contact mt-20 pt-6 text-uppercase flex justify-center items-center">
                <h1 className="text-white text-4xl">Contacts</h1>
            </div>

            {/* Google Map and Contact Form */}
            <div className="flex flex-col md:flex-row p-5 pt-8 m-0">
                <div className="md:w-1/2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31353.5237303693!2d106.7588609!3d10.7967196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d0757c15b7%3A0x3afdf063537f428!2sMia%20Saigon%20-%20Luxury%20Boutique%20Hotel!5e0!3m2!1svi!2s!4v1727929576090!5m2!1svi!2s"
                        width="100%"
                        height="416"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="md:w-1/2 px-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Name and surname*"
                                    className="form-input rounded-md p-3 w-full"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Country and city*"
                                    className="form-input rounded-md p-3 w-full"
                                    id="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email*"
                                className="form-input w-full p-3 rounded-md"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div>
                            <textarea
                                placeholder="Message*"
                                className="form-input p-3 w-full h-56 rounded-md"
                                id="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            className="p-2 rounded-md w-full bg-red-600 font-semibold text-white uppercase"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Sending...' : 'Send'} {/* Show loading text */}
                        </button>
                    </form>
                </div>
            </div>
            {/* Four Icon Boxes */}
            <div className="flex flex-wrap p-5 pt-0 m-0">
                {[
                    {
                        title: 'Live chat',
                        description: 'Do you need help right away? Chat now with our experts. The chat is open during regular working hours, but you can leave a message if it is closed.',
                        buttonText: 'Chat now',
                    },
                    {
                        title: 'Book an Online Appointment',
                        description: 'Do you have a project that you would like to discuss in a bit more detail? Schedule a 15-minute appointment with our client services team.',
                        buttonText: 'Book now',
                    },
                    {
                        title: 'Email Us',
                        description: 'For general enquiries, price, questions, you can drop us a message below. We will receive this as an email and will get in touch with you shortly.',
                        buttonText: 'Email Us',
                    },
                    {
                        title: 'Give Us a Call',
                        description: 'If you need help with an online order admin , or if you prefer to talk to us, you can give us a call “+84 333 376 951” Mon-Sat 8:00am-5:30pm.',
                        buttonText: 'Call Us',
                    },
                ].map((item, index) => (
                    <div key={index} className="w-1/2 md:w-1/4 p-4">
                        <div className="border rounded text-center p-4">
                            <div className="mb-2 flex justify-center">
                                {/* Updated SVG with white stroke color */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
                                    <path
                                        d="M30.5 50.625C42.925 50.625 53 41.39 53 30C53 18.61 42.925 9.375 30.5 9.375C18.075 9.375 8 18.61 8 30C8 35.26 10.1475 40.0575 13.6825 43.7C14.7625 44.8175 15.5325 46.3 15.1475 47.8025C14.7259 49.4454 13.9369 50.9713 12.84 52.265C13.7179 52.4227 14.6081 52.5013 15.5 52.5C18.705 52.5 21.675 51.495 24.1125 49.7825C26.1375 50.3325 28.2825 50.625 30.5 50.625Z"
                                        stroke="white" // Change stroke color to white
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>

                            <h6 className="font-semibold text-white">{item.title}</h6>
                            <p className="text-sm text-white">{item.description}</p>
                            <a href="#" className="mt-2 inline-block bg-black text-white p-2 uppercase">{item.buttonText}</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Office Information */}
            <div className="bg-black text-white text-center p-4 mx-4">
                <h2 className="text-3xl">OFFICE</h2>
                <div className="flex flex-wrap justify-center p-4">
                    {[
                        {
                            location: 'DA NANG',
                            phone: '0987 654 321',
                            address: '112, Street 81/9A – Nguyen Van Qua Ward – City. An- Da Nang City',
                        },
                        {
                            location: 'HO CHI MINH CITY',
                            phone: '0987 654 321',
                            address: '76, Street 10A – An Khanh Ward – City. Thu Duc - HCM City',
                        },
                        {
                            location: 'HAI PHONG',
                            phone: '0987 654 321',
                            address: 'Team 7 - An Tho Commune - An Lao District',
                        },
                        {
                            location: 'HA NOI',
                            phone: '0987 654 321',
                            address: '21, Ave 02 - Sunrise A - The Manor Central Park - Nguyen Xien',
                        },
                    ].map((office, index) => (
                        <div
                            key={index}
                            className="border-r border-white text-white p-2 flex flex-col items-center w-1/4"
                        >
                            <h5 className="font-bold">{office.location}</h5>
                            <span className="text-sm">{office.phone}</span>
                            <p className="text-sm text-center w-40">{office.address}</p>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contact;
