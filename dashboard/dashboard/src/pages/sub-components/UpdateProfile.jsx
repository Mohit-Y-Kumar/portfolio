import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-dropdown-menu';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpecialLoadingButton from './specialLoadingButton';
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slices/userSlices';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const { user, loading, error, isUpdated, message } = useSelector((state) => state.user);
    const [fullName, setFullName] = useState(user && user.fullName);
    const [email, setEmail] = useState(user && user.email);
    const [phone, setPhone] = useState(user && user.phone);
    const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
    const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
    const [linkedin_URL, setLinkedInURL] = useState(
        user && (user.linkedin_URL === "undefined" ? "" : user.linkedin_URL)
    );
    const [github_URL, setGithubURL] = useState(
        user && (user.github_URL === "undefined" ? "" : user.github_URL)
    );
    const [instagram_URL, setInstagramURL] = useState(
        user && (user.instagram_URL === "undefined" ? "" : user.instagram_URL)
    );
    const [twitter_URL, setTwitterURL] = useState(
        user && (user.twitter_URL === "undefined" ? "" : user.twitter_URL)
    );
    const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
    const [avatarPreview, setAvatarPreview] = useState(
        user && user.avatar && user.avatar.url
    );
    const [resume, setResume] = useState(user && user.resume && user.resume.url);
    const [resumePreview, setResumePreview] = useState(
        user && user.resume && user.resume.url
    );

    const dispatch = useDispatch();

    const avatarHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatarPreview(reader.result);
            setAvatar(file);
        };
    };
    const resumeHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setResumePreview(reader.result);
            setResume(file);
        };
    };
    const handleUpdateProfile = () => {
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("aboutMe", aboutMe);
        formData.append("portfolioURL", portfolioURL);
        formData.append("linkedin_URL", linkedin_URL);
        formData.append("github_URL", github_URL);
        formData.append("instagram_URL", instagram_URL);
        formData.append("twitter_URL", twitter_URL);
        formData.append("avatar", avatar);
        formData.append("resume", resume);
        dispatch(updateProfile(formData));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (isUpdated) {
            dispatch(getUser());
            dispatch(resetProfile());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, loading, error, isUpdated]);

    return (
        <>

            <div className="w-full h-full">
                <div>
                    <div className="grid w-[100%] gap-6">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold">Update Profile</h1>
                            <p className="text-balance text-muted-foreground">
                                Update Your Profile
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                                <div className="grid gap-2 w-full sm:w-72">
                                    <Label>Profile Image</Label>
                                    <img
                                        src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                                        alt="avatar"
                                        className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                                    />
                                    <div className="relative">
                                        <Input
                                            type="file"
                                            onChange={avatarHandler}
                                            className="avatar-update-btn"
                                        />
                                    </div>

                                </div>


                                <div className="grid gap-2 w-full sm:w-72 ">
                                    <Label>Resume</Label>
                                    <Link
                                        to={user && user.resume && user.resume.url}
                                        target="_blank"
                                    >
                                        <img
                                            src={resumePreview ? resumePreview : "/avatarHolder.jpg"}
                                            alt="avatar"
                                            className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                                        />
                                    </Link>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={resumeHandler}
                                            className="avatar-update-btn"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Full Name</Label>
                                <Input
                                    type="text"

                                    placeholder="Your Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Email</Label>
                                <Input
                                    type="text"

                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Phone</Label>
                                <Input
                                    type="text"

                                    placeholder="Your phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>About Me</Label>
                                <Textarea
                                    type="text"

                                    placeholder="About Me"
                                    value={aboutMe}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Portfolio URL</Label>
                                <Input
                                    type="text"
                                    placeholder=" Your Portfolio URL"
                                    value={portfolioURL}
                                    onChange={(e) => setPortfolioURL(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>LinkedIn URL</Label>
                                <Input
                                    type="text"
                                    placeholder=" Your LinkedIn URL"
                                    value={linkedin_URL}
                                    onChange={(e) => setLinkedInURL(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Github URL</Label>
                                <Input
                                    type="text"
                                    placeholder=" Your Github URL"
                                    value={github_URL}
                                    onChange={(e) => setGithubURL(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Instagram URL</Label>
                                <Input
                                    type="text"
                                    placeholder=" Your Instagram URL"
                                    value={instagram_URL}
                                    onChange={(e) => setInstagramURL(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Twitter(X) URL</Label>
                                <Input
                                    type="text"
                                    placeholder=" Your Twitter(X) URL"
                                    value={twitter_URL}
                                    onChange={(e) => setTwitterURL(e.target.value)}
                                />
                            </div>
                            <div className='grid gap-2 bg-black text-white'>
                                {!loading ? (
                                    <Button
                                        onClick={() => handleUpdateProfile()}
                                        className="w-full"
                                    >
                                        Update Profile
                                    </Button>
                                ) : (
                                    <SpecialLoadingButton content={"Updating"} />
                                )}
                            </div>

                        </div>
                    </div >

                </div >

            </div>

        </>)
}

export default UpdateProfile;
