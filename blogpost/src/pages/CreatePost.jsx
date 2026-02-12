import {FaHeading, FaUser, FaLink, FaCloudUploadAt, FaTimes, FaregPaperPlane, FaRegPaperPlane}from 'react-icons/fa';
import Navbar from '../components/Navbar';
import './CreatePost.css';

const CreatePost = () =>{
    return(
        <div className='create-post-page'>
            <Navbar/>

            <div className='create-post-container'>
                <header className='form-header'>
                    <h1>Create New Post</h1>
                    <p>share your thoughts and stories with the world </p>
                </header>

                <div className='post-form-card'>
                    <form>
                        <div className='form-group'>
                            <label>Post Title</label>
                            <div className='input-wrapper'>
                                <FaHeading className='input-icon'/>
                                <input
                                type='text'
                                name='title'
                                className='form-control'
                                placeholder='Enter a catchy title...'
                                />
                            </div>
                        </div>

                        <div className="from-group">
                            <label>Author Name</label>
                            <div className='input-wrapper'>
                                <FaHeading className='input-icon' />
                                <input
                                type='text'
                                name='author'
                                className='form-control'
                                placeholder='Your name'
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Desciption</label>
                            <textarea
                            name='description'
                            className='form-control'
                            placeholder='what on your mind? write your story here'
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>Cover Image</label>

                            <div className='image-source-tabs'>
                                <button type='button' className='tab-btn-active'>
                                    Image Url
                                </button>

                                <button type='button' className='tab-btn'>
                                    Upload File
                                </button>
                            </div>

                            <div className="input-wrapper">
                                <FaLink className='input-icon'/>
                                <input
                                    type='url'
                                    name='imageurl'
                                    className='form-control'
                                    placeholder='Paste image url here (e.g.https://...'
                                    />
                            </div>

                            <div className="image-upload-are">
                                <FaCloudUploadAt className='upload-icon'/>
                                <p>click to upload image from your device</p>
                            </div>

                            <div className="image-preview-container">
                                <img
                                    src=''
                                    alt='Preview'
                                    className='image-preview'
                                />
                                <button type='button' className='remove-image-btn'>
                                    <FaTimes />
                                </button>
                            </div>
                        </div>

                        <div className="form-actions-row">
                            <button type='submit' className='submit-btn'>
                                <FaRegPaperPlane /> Publish Post
                            </button>

                            <button type='button' className='cancle-btn'>
                                Clear Form
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}