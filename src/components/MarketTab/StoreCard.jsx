import React, { useState, useEffect } from 'react';
import { styled } from "styled-components";
import Carousel from "react-multi-carousel";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { get } from "firebase/database";
import { firebaseDatabase, firebaseStorage } from "../../firebase-config";

//시장 탭에서 점포 목록에 들어갈 컴포넌트
const StoreCard = ({ marketIndex, storeIndex }) => {
    const [images, setImages] = useState([]);   //점포 사진 url 목록 (로딩 오래 걸리면 1개로 변경)
    const [storeData, setStoreData] = useState();

    useEffect(() => {
        loadImage();
        console.log("시장", marketIndex, "점포", storeIndex);
    }, []);

    //점포 사진
    const loadImage = () => {
        const imageRef = ref(firebaseStorage, `images/stores/${marketIndex}/${storeIndex}`);
        listAll(imageRef)
            .then((res) => {
                const imageUrlList = [];
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef)
                        .then((url) => {
                            imageUrlList.push(url);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
                setImages(imageUrlList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //점포 정보
    const loadData = () => {
        const dataRef = ref(firebaseDatabase, `stores/${marketIndex}/${storeIndex}`);
        get(dataRef).then((snapshot) => {
            if (snapshot.exists()) {
                setStoreData(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    //클릭 시 점포 탭으로 이동
    const handleClick = () => {

    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };


    return (
        <>
            <Wrapper onClick={handleClick}>
                {images.length > 0 ?
                    images.map(url => (
                        <ImageContainer>
                            <Image src={url} alt="store image" />
                        </ImageContainer>
                    )) :
                    <ImageContainer>
                        <Image src="logo512.png" alt="default image" />
                    </ImageContainer>}
                {/* <StoreName>{storeData["점포명"]}</StoreName>
                <StoreItem>{storeData["판매상품"]}</StoreItem>
                <StoreDescription>{storeData["연락처"]}</StoreDescription>
                <TagContainer>
                    <Tag></Tag>
                </TagContainer> */}
                <div>{marketIndex}번 시장 - {storeIndex}번 점포</div>
            </Wrapper>
        </>
    );
};

export default StoreCard;

//styled
const Wrapper = styled.div`
    width: 90%;
    height: 100px;
    background-color: lightgrey;
    margin-bottom: 10px;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 150px;
`;

const Image = styled.img`
    object-fit: contain;
    object-position: 50% 50%;
`;

const StoreName = styled.p``;

const StoreItem = styled.p``;

const StoreDescription = styled.p``;

const TagContainer = styled.div``;

const Tag = styled.div``;