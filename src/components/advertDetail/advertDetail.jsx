import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { Card, Image }  from 'react-bootstrap';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Link } from "react-router-dom";
import apiCall from '../api/api';
import Swal from 'sweetalert2';

const { adDetail } = apiCall();

function checkStatus(status){
    if(status === true) {
        return(
            <Card.Text>To sell</Card.Text>
        )
    }else{
        return (
            <Card.Text>To Buy</Card.Text>
        )
    }
}

function renderImg(img) {
    const imgPath = 'http://localhost:3000/images/';
    if(img){
        return(
            <Image className="center" height="500" variant="top" src={`${imgPath}${img}`} fluid/>
        )
    }
}

export default function AdvertDetail(props) {
    const adId = props.match.params.id;
    const [adverts, setAdverts] = useState({
        name: '',
        description: '',
        image: '',
        tags: [],
        owner: '',
        price: '',
        status: ''
    });
    useEffect(() => {
        setAdverts(async () => {
            const response = await adDetail(adId);
            setAdverts(response); 
        })
    }, []);
    return (
        <div>
            <Card>
                <Card.Title>Title: {adverts.name}</Card.Title>
            </Card>
            {renderImg(adverts.image)}
            <Card>
                <Card.Body>
                <Card.Text>
                    Description: {adverts.description}
                </Card.Text>
                <Card.Text>
                    Price: {adverts.price} €
                </Card.Text>
                {checkStatus(adverts.status)}
                <Card.Text>
                    Tags: {adverts.tags}
                </Card.Text>
                <Card.Text>
                    Owner: 
                    <Link to={`/adsOwner/${adverts.owner}`}>
                        {adverts.owner}
                    </Link>
                </Card.Text>
                <Card.Text>
                <FacebookShareButton 
                    url="https://github.com/wallaclone/wallaclone_back/tree/sprint2">
                    <FacebookIcon size={32} round={true}></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton
                    url="https://github.com/wallaclone/wallaclone_back/tree/sprint2">
                    <TwitterIcon size={32} round={true}></TwitterIcon>
                </TwitterShareButton>
                </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}