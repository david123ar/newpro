"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";
import "./random.css"; // Ensure you have appropriate styles
import Link from "next/link";

const Hero = ({ slides }) => {
  return (
    <div className="rending-section-wrapper">
      <div className="headd">
        <div className="trh">
          <div className="trhh">Random</div>
        </div>
        <div className="flex righto">
          <div className="all">
            <Link href={'/random/go'} className="traa">Randomize</Link>
          </div>
          <div className="trendi-swiper-navigation">
            <div className="btn-previ swipe-controls">
              <FaChevronLeft size={15} />
            </div>
            <div className="btn-nexti swipe-controls">
              <FaChevronRight size={15} />
            </div>
          </div>
        </div>
      </div>
      <div className="tendi">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".btn-nexti",
            prevEl: ".btn-previ",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            2600: {
              slidesPerView: 11,
              spaceBetween: 10,
            },
            2400: {
              slidesPerView: 10,
              spaceBetween: 10,
            },
            1970: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
            1700: {
              slidesPerView: 8,
              spaceBetween: 10,
            },
            1600: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1450: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 4,
            },
            200: {
              slidesPerView: 2,
            },
            450: {
              slidesPerView: 3,
            },
          }}
          loop={false}
          spaceBetween={10}
          slidesPerView={7}
          className="trending-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={slide.id} className="trending-slide">
              <motion.div
                initial={{ opacity: 0, x: "100%" }} // Start position off-screen to the right
                animate={{ opacity: 1, x: 0 }} // Animate to visible position
                transition={{
                  duration: 0.5,
                  delay: idx * 0.2, // Stagger each image
                  ease: easeOut,
                }}
                className="trending-slide-content"
              >
                <Link href={slide.id}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    width={300}
                    height={200}
                    layout="responsive"
                    className="trending-slide-img"
                  />
                </Link>
                <div className="trending-slide-details">
                  <Link href={slide.id} className="trending-slide-link">
                    <span className="trending-slide-title">{slide.title}</span>
                  </Link>
                  <span className="trending-slide-rank">{slide.views}</span>
                </div>
                <div className="trending-item-sidebar">
                  <p>{slide.rank}</p>
                  <span>{slide.rating}</span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="navitr">
          <div className="trending-swiper-navigation">
            <div className="btn-nexti swiper-controls">
              <FaChevronRight size={20} />
            </div>
            <div className="btn-previ swiper-controls">
              <FaChevronLeft size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
