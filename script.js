// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
            // Removed highlight-card and Vanilla Tilt logic
        }
    });
}, observerOptions);

// Observe all sections and highlight cards
document.querySelectorAll('section, .highlight-card').forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Steam animation for the hero section
function createSteamParticle() {
    const steam = document.createElement('div');
    steam.classList.add('steam');
    steam.style.left = Math.random() * 100 + '%';
    steam.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.querySelector('.hero').appendChild(steam);

    steam.addEventListener('animationend', () => {
        steam.remove();
    });
}

// Create steam particles periodically
setInterval(createSteamParticle, 500);

// Mobile menu toggle
const mobileMenuButton = document.createElement('button');
mobileMenuButton.classList.add('mobile-menu-toggle');
mobileMenuButton.innerHTML = '<span></span><span></span><span></span>';

const nav = document.querySelector('nav');
nav.insertBefore(mobileMenuButton, nav.firstChild);

mobileMenuButton.addEventListener('click', () => {
    nav.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('mobile-menu-open')) {
        nav.classList.remove('mobile-menu-open');
    }
});

// Add additional steam effects to the 3D model viewer
const modelViewer = document.querySelector('model-viewer');
if (modelViewer) {
    modelViewer.addEventListener('load', () => {
        const steamContainer = document.createElement('div');
        steamContainer.classList.add('model-steam-container');
        modelViewer.parentElement.appendChild(steamContainer);

        function createModelSteam() {
            const steam = document.createElement('div');
            steam.classList.add('model-steam');
            steamContainer.appendChild(steam);

            steam.addEventListener('animationend', () => {
                steam.remove();
            });
        }

        setInterval(createModelSteam, 1000);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.flip-card'), {
      max: 18,
      speed: 400,
      scale: 1.04,
      perspective: 900,
      glare: true,
      'max-glare': 0.18
    });
  }

    // Comment form functionality
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const comment = document.getElementById('comment').value.trim();
            
            if (name && email && comment) {
                addComment(name, comment);
                commentForm.reset();
            }
        });
    }
    
    // Load existing comments from localStorage
    loadExistingComments();
    
    function loadExistingComments() {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        comments.forEach(comment => {
            displayComment(comment.author, comment.text, comment.date);
        });
    }
    
    function addComment(name, text) {
        const currentDate = new Date();
        const timeAgo = getTimeAgo(currentDate);
        
        // Save to localStorage for admin panel
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const newComment = {
            author: name,
            text: text,
            date: timeAgo
        };
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        
        // Display the comment
        displayComment(name, text, timeAgo);
    }
    
    function displayComment(name, text, date) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        
        commentDiv.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${name}</span>
                <span class="comment-date">${date}</span>
            </div>
            <p class="comment-text">${text}</p>
        `;
        
        // Add new comment at the top
        commentsList.insertBefore(commentDiv, commentsList.firstChild);
        
        // Add fade-in animation
        commentDiv.style.opacity = '0';
        commentDiv.style.transform = 'translateY(20px)';
        setTimeout(() => {
            commentDiv.style.transition = 'all 0.5s ease';
            commentDiv.style.opacity = '1';
            commentDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    }
    
    // Gallery functionality
    loadGallery();
    
    // Authentication functionality
    let currentUser = null;
    
    // Check if user is already logged in
    checkAuthStatus();
    
    function checkAuthStatus() {
        const user = localStorage.getItem('chaiJaaiUser');
        if (user) {
            currentUser = JSON.parse(user);
            updateAuthButtons();
        }
    }
    
    function updateAuthButtons() {
        const authButtons = document.querySelector('.auth-buttons');
        if (currentUser) {
            authButtons.innerHTML = `
                <span class="user-welcome">Welcome, ${currentUser.name}</span>
                <button class="auth-btn logout-btn" onclick="logout()">Logout</button>
            `;
        } else {
            authButtons.innerHTML = `
                <button class="auth-btn login-btn" onclick="openAuthModal('login')">Login</button>
                <button class="auth-btn signup-btn" onclick="openAuthModal('signup')">Sign Up</button>
            `;
        }
    }
    
    function openAuthModal(type) {
        const modal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (type === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
        
        modal.style.display = 'block';
    }
    
    function closeAuthModal() {
        document.getElementById('authModal').style.display = 'none';
    }
    
    function switchAuthForm(type) {
        if (type === 'login') {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('signupForm').style.display = 'none';
        } else {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('signupForm').style.display = 'block';
        }
    }
    

    
    function signInWithGoogle() {
        // Show loading state
        const googleBtn = event.target;
        const originalText = googleBtn.innerHTML;
        googleBtn.disabled = true;
        googleBtn.innerHTML = '<span>Redirecting...</span>';
        
        // Simulate Google OAuth redirect
        showNotification('Redirecting to Google OAuth...', 'info');
        
        // Simulate successful Google login after redirect
        setTimeout(() => {
            const mockUser = {
                name: 'Demo User',
                email: 'demo@example.com',
                provider: 'google'
            };
            currentUser = mockUser;
            localStorage.setItem('chaiJaaiUser', JSON.stringify(mockUser));
            updateAuthButtons();
            closeAuthModal();
            showNotification('Successfully signed in with Google!', 'success');
            
            // Reset button
            googleBtn.disabled = false;
            googleBtn.innerHTML = originalText;
        }, 2000);
    }
    
    function handleLogin(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simulate login validation
        if (email && password) {
            const mockUser = {
                name: email.split('@')[0],
                email: email,
                provider: 'email'
            };
            currentUser = mockUser;
            localStorage.setItem('chaiJaaiUser', JSON.stringify(mockUser));
            updateAuthButtons();
            closeAuthModal();
            showNotification('Successfully logged in!', 'success');
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    }
    
    function handleSignup(event) {
        event.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (name && email && password) {
            const mockUser = {
                name: name,
                email: email,
                provider: 'email'
            };
            currentUser = mockUser;
            localStorage.setItem('chaiJaaiUser', JSON.stringify(mockUser));
            updateAuthButtons();
            closeAuthModal();
            showNotification('Account created successfully!', 'success');
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('authModal');
        if (event.target === modal) {
            closeAuthModal();
        }
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAuthModal();
        }
    });
    

    
    function logout() {
        currentUser = null;
        localStorage.removeItem('chaiJaaiUser');
        updateAuthButtons();
        showNotification('Successfully logged out!', 'success');
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        let backgroundColor;
        switch(type) {
            case 'success':
                backgroundColor = '#4CAF50';
                break;
            case 'error':
                backgroundColor = '#f44336';
                break;
            case 'info':
                backgroundColor = '#2196F3';
                break;
            default:
                backgroundColor = '#666';
        }
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            background: ${backgroundColor};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    

    
    function loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;
        
        const photos = JSON.parse(localStorage.getItem('photos') || '[]');
        
        galleryGrid.innerHTML = '';
        
        photos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${photo.url}" alt="${photo.title}" loading="lazy">
                <div class="gallery-item-content">
                    <div class="gallery-item-title">${photo.title}</div>
                    <div class="gallery-item-description">${photo.description}</div>
                    <div class="gallery-item-price">₹1,200 - ₹2,500</div>
                </div>
            `;
            
            // Add click event to show larger image
            galleryItem.addEventListener('click', () => {
                showImageModal(photo);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    function showImageModal(photo) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${photo.url}" alt="${photo.title}">
                <div class="modal-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                    <div class="modal-price">₹1,200 - ₹2,500</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.className === 'close-modal') {
                document.body.removeChild(modal);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
});