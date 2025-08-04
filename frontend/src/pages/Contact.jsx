import React from 'react'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault(); // prevent page reload

    try {
      const formData = new FormData(event.target);

      formData.append("access_key", "e29071e2-81a6-4dc8-a6ed-f04fb5ba7e01");

      const object = Object.fromEntries(formData.entries());
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const res = await response.json();

      if (res.success) {
        toast.success(res.message || "Message sent successfully!");
        event.target.reset(); // reset the form
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600'>
        <p>CONTACT <span className='text-color2 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-5 md:gap-20'>
        {/* Contact Details */}
        <div>
          <img className='w-full md:max-w-[500px]' src={assets.contact_image} alt="Contact" />
          <div className='flex flex-col py-5'>
            <b>OUR <span className='text-gray-600'>OFFICE</span></b>
            <p className='text-gray-600 text-sm'>741235, A12, Kalyani <br /> Nadia, West Bengal, India</p>
            <p className='text-gray-600 text-sm'>Phone: <span>+91 75578 82856</span></p>
            <p className='text-gray-600 text-sm'>Email: <span>tnmypl2003@gmail.com</span></p>
          </div>
        </div>

        {/* Contact Form */}
        <form className='w-full flex flex-col gap-10 md:gap-8' onSubmit={onSubmit}>
          <div className='flex flex-col gap-2'>
            <b className='text-lg text-gray-700'>Your Name</b>
            <input
              className='w-full py-1.5 px-3 border border-zinc-300 rounded text-gray-900'
              type="text"
              name="name"
              placeholder='Enter your name'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <b className='text-lg text-gray-700'>Your Email</b>
            <input
              className='w-full py-1.5 px-3 border border-zinc-300 rounded text-gray-900'
              type="email"
              name="email"
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <b className='text-lg text-gray-700'>Write your message here</b>
            <textarea
              className='w-full py-1.5 px-3 border border-zinc-300 rounded text-gray-900'
              rows={5}
              name="message"
              placeholder='Enter your message'
              required
            />
          </div>

          <div>
            <button
              className='bg-color2 text-black text-sm font-medium px-14 py-3 rounded-full hover:bg-color3 transition-all duration-300'
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
