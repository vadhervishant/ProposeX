import * as React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardMedia, CardContent, Avatar } from '@mui/material';

// import ContentControl from '../watchlist/contentControl/contentControl';
import UserReview from './PostRating';
import { Buffer } from 'buffer';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function PostDetails() {

    const [post, setPost] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [hasReview, setHasReview] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [ratingUser, setRatingUser] = useState(0);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const location = useLocation();
    const id = location?.state?.id;

    const email = localStorage.getItem("email");
    const [buttonClick, setButtonClick] = useState(false);

    const onEdit = (content, rating, reviewId) => {

        if (!localStorage.getItem("token")) { navigate("/") }
        fetch(
            `${process.env.REACT_APP_BASE_URL}/reviews/${reviewId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "rating": rating,
                    "comment": content
                })
            }
        ).then((response) => {
            console.log("response json is: " + response.json());
        })
            .then((data) => {
                fetchAllReviews(post._id);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        fetch(
            `${process.env.REACT_APP_BASE_URL}` + `/Posts/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => response.json())
            .then((data) => {
                setPost(data);
                fetchAllReviews(id);
            })
            .catch((error) => console.log(error));
    }, [id, buttonClick]);

    const handleReviewSubmit = (event) => {
        event.preventDefault(); // prevent the default form submission behavior
        setFormData(new FormData(event.target));
        const userObj = JSON.parse(localStorage.getItem('user'));
        if (!localStorage.getItem("token")) { navigate("/") }

        if (reviewText && reviewText.length > 0) {
            const apiBody = JSON.stringify({
                "userId": userObj._id,
                "contentId": post._id,
                "rating": ratingUser,
                "totalRating": 5,
                "comment": reviewText,
                "category": "books",
                "userName": (
                    userObj.firstName && userObj.lastName
                ) ? (userObj.firstName + userObj.lastName) : "User X"
            })
            fetch(
                `${process.env.REACT_APP_BASE_URL}/reviews`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: apiBody
                }
            ).then((response) => {
                console.log("response json is: " +  response.json());
                setReviewText('');
            })
            .then((data) => {
                fetchAllReviews(post._id);
            })
            .catch((error) => console.log(error));
        }
    };


    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData
        });
    }

    const fetchAllReviews = (contentId) => {

        if (!localStorage.getItem("token")) { navigate("/") }
        fetch(
            `${process.env.REACT_APP_BASE_URL}` + `/reviews?contentId=${contentId}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((response) => response.json())
            .then((data) => {
                if (data) {
                    const updatedData = data.map((record, index) => {

                        const userObj = JSON.parse(localStorage.getItem('user'));

                        let isUserReview = false;

                        if (userObj._id == record.userId) {
                            isUserReview = true;
                            setHasReview(true);
                        }
                        return {
                            ...record,
                            belongsToUser: isUserReview
                        }
                    })
                    setReviews(updatedData);
                }
                else {
                    setReviews([]);
                }
            })
            .catch((error) => console.log(error));
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    if (!reviews) {
        return <div>Loading User Reviews..</div>
    }

    const { image, title, authors, publisher, isbn, summary, genre, dateReleased } = post;

    let imageSrc = '';
    if (image) {
        if (image.type === "Buffer") {
            imageSrc = `data:image/jpeg;base64,${Buffer.from(image).toString('base64')}`;
        } else {
            imageSrc = image;
        }
    } else {
        imageSrc = '';
    }

    const releaseDate = new Date(post.dateReleased);
    const formattedDate = releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const cardStyles = {
        borderRadius: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '850px',
        // You can add more styles here to customize the appearance of the card
    };

    const mediaStyles = {
        height: '400px',
        objectFit: 'cover',
    };
    const ratingSectionStyles = {
        display: 'flex',
        alignItems: 'center', // Center the rating text and component vertically
        marginTop: '8px', // Add a small margin between the sections
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Card style={cardStyles}>
                <CardHeader
                    avatar={<Avatar aria-label="book">{title.charAt(0)}</Avatar>}
                    title={title}
                    subheader={`Post Date: ${new Date(post.dateofPost).toLocaleString('en-us', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}`}
                />
                <CardMedia style={mediaStyles} image={imageSrc} title={title} />
                <CardContent>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        <b>Location:</b> {post.location}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        <b>Overview:</b>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {post.description}
                    </Typography>
                </CardContent>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                    {reviews.map((review, index) => (
                        <Grid  item key={review} xs={12} md={11}>
                            <UserReview review={review} onEdit={onEdit} style={{ marginRight: '10px' }} />
                        </Grid>
                    ))}
                </Grid>

                <form onSubmit={handleReviewSubmit}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            <TextField
                                id="review-text"
                                name="userComment"
                                label="Write a review"
                                multiline
                                fullWidth
                                value={reviewText}
                                onChange={(event) => setReviewText(event.target.value)}
                                variant="outlined"
                                margin="normal"
                            />
                        </Typography>
                        <Button type="submit" variant="contained" color="primary">
                            Post
                        </Button>
                    </CardContent>
                </form>

            </Card>
        </div>
    );
}