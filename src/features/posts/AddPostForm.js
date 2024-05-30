import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)


    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({ title, body: content, userId })).unwrap()

                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
            }
        }

    }

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section style={{ maxWidth: '600px', marginTop:"50px", padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize:"28px", textAlign: 'center', color: '#3D3B40' }}>Add a New Post</h2>
        <form>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="postTitle" style={{color:"#4F4E51", display: 'block', fontWeight: 'medium', fontSize:"20px", marginBottom: '5px' }}>Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="postAuthor" style={{ color:"#4F4E51",display: 'block', fontWeight: 'medium', fontSize:"20px", marginBottom: '5px' }}>Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChanged} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <option value=""></option>
                    {usersOptions}
                </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="postContent" style={{ display: 'block', fontWeight: 'medium', fontSize:"20px", color:"#4F4E51", marginBottom: '5px' }}>Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '150px' }}
                />
            </div>
            <button
                type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
                style={{ width: '100%', padding: '10px', backgroundColor: canSave ? '#378CE7' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px', cursor: canSave ? 'pointer' : 'not-allowed' }}
            >Save Post</button>
        </form>
    </section>
    
    )
}
export default AddPostForm