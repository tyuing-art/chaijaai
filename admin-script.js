// Admin Panel JavaScript

// Admin credentials (in production, this should be server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'chaijaai2024',
    adminEmails: ['hashimadil0001@gmail.com', 'admin@chaijaai.com']
};

// Check if user is already logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const user = JSON.parse(localStorage.getItem('chaiJaaiUser') || '{}');
    
    if (isLoggedIn === 'true' || ADMIN_CREDENTIALS.adminEmails.includes(user.email)) {
        showDashboard();
    } else {
        // Check if user is logged in from main site with admin email
        if (user.email && ADMIN_CREDENTIALS.adminEmails.includes(user.email)) {
            localStorage.setItem('adminLoggedIn', 'true');
            showDashboard();
        }
    }
}

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if ((username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) || 
        ADMIN_CREDENTIALS.adminEmails.includes(username)) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
        errorDiv.textContent = '';
    } else {
        errorDiv.textContent = 'Invalid username or password';
    }
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadComments();
    loadPhotos();
}

// Logout functionality
function handleLogout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
}

// Load comments from localStorage
function loadComments() {
    const commentsList = document.getElementById('adminCommentsList');
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    
    commentsList.innerHTML = '';
    
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
            <div class="comment-actions">
                <button class="delete-btn" onclick="deleteComment(${index})">Delete</button>
            </div>
        `;
        commentsList.appendChild(commentDiv);
    });
}

// Delete comment
function deleteComment(index) {
    if (confirm('Are you sure you want to delete this comment?')) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.splice(index, 1);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments();
    }
}

// Load photos from localStorage
function loadPhotos() {
    const photosList = document.getElementById('adminPhotosList');
    const photos = JSON.parse(localStorage.getItem('photos') || '[]');
    
    photosList.innerHTML = '';
    
    photos.forEach((photo, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-item';
        photoDiv.innerHTML = `
            <img src="${photo.url}" alt="${photo.title}">
            <div class="photo-title">${photo.title}</div>
            <div class="photo-description">${photo.description}</div>
            <div class="photo-actions">
                <button class="delete-btn" onclick="deletePhoto(${index})">Delete</button>
            </div>
        `;
        photosList.appendChild(photoDiv);
    });
}

// Handle photo upload
function handlePhotoUpload(event) {
    event.preventDefault();
    
    const title = document.getElementById('photoTitle').value;
    const file = document.getElementById('photoFile').files[0];
    const description = document.getElementById('photoDescription').value;
    
    if (!title || !file) {
        alert('Please fill in all required fields');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const photo = {
            title: title,
            description: description,
            url: e.target.result,
            date: new Date().toLocaleDateString()
        };
        
        const photos = JSON.parse(localStorage.getItem('photos') || '[]');
        photos.push(photo);
        localStorage.setItem('photos', JSON.stringify(photos));
        
        loadPhotos();
        document.getElementById('photoUploadForm').reset();
    };
    
    reader.readAsDataURL(file);
}

// Delete photo
function deletePhoto(index) {
    if (confirm('Are you sure you want to delete this photo?')) {
        const photos = JSON.parse(localStorage.getItem('photos') || '[]');
        photos.splice(index, 1);
        localStorage.setItem('photos', JSON.stringify(photos));
        loadPhotos();
    }
}

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Event listeners
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('photoUploadForm').addEventListener('submit', handlePhotoUpload);
    
    // Add some sample data if none exists
    if (!localStorage.getItem('comments')) {
        const sampleComments = [
            {
                author: 'Sarah M.',
                text: 'Absolutely love the ambiance here! The Kahwa tea is divine and the view of the Jhelum River is breathtaking. A must-visit in Srinagar!',
                date: '2 days ago'
            },
            {
                author: 'Rajesh K.',
                text: 'The blend of English tea room elegance with Kashmiri culture is perfect. Great place to relax and enjoy authentic local flavors.',
                date: '1 week ago'
            }
        ];
        localStorage.setItem('comments', JSON.stringify(sampleComments));
    }
    
    if (!localStorage.getItem('photos')) {
        const samplePhotos = [
            {
                title: 'Kahwa Pyāla - Hand Painted',
                description: 'Traditional Kashmiri Kahwa served in exquisite hand-painted Pyāla using 200-year-old naqashi art',
                url: 'https://chaijaai.com/wp-content/uploads/2024/01/kahwa-pyāla.jpg',
                date: '2024-01-15'
            },
            {
                title: 'Noon Chai Pyāla Set',
                description: 'Authentic Noon Chai experience with artisanal hand-painted tea ware from downtown Srinagar',
                url: 'https://chaijaai.com/wp-content/uploads/2024/01/noon-chai-set.jpg',
                date: '2024-01-15'
            },
            {
                title: 'Pyāla Tea for One',
                description: 'Perfect individual tea experience with hand-crafted ceramics featuring traditional Kashmiri motifs',
                url: 'https://chaijaai.com/wp-content/uploads/2024/01/tea-for-one.jpg',
                date: '2024-01-15'
            },
            {
                title: 'Artisanal Teapots Collection',
                description: 'Hand-painted teapots showcasing the mystical skills of Srinagar artisans with contemporary design',
                url: 'https://chaijaai.com/wp-content/uploads/2024/01/teapots-collection.jpg',
                date: '2024-01-15'
            },
            {
                title: 'Pyāla Plate Set',
                description: 'Elegant tableware combining traditional papier machie art with modern dining aesthetics',
                url: 'https://chaijaai.com/wp-content/uploads/2024/01/pyāla-plates.jpg',
                date: '2024-01-15'
            },
            {
                title: 'Chai Jaai Exterior View',
                description: 'Beautiful heritage building on The Bund with spectacular view of the historical Jhelum River',
                url: 'images/image0 (1).jpg',
                date: '2024-01-15'
            }
        ];
        localStorage.setItem('photos', JSON.stringify(samplePhotos));
    }
});

// Sync comments with main site
function syncCommentsWithMainSite() {
    const comments = JSON.parse(localStorage.getItem('comments') || '[]');
    // This function can be used to sync comments with the main website
    // In a real application, this would involve API calls to a backend server
    console.log('Comments synced:', comments);
}

// Export functions for use in main site
window.adminPanel = {
    syncCommentsWithMainSite,
    loadComments,
    loadPhotos
}; 