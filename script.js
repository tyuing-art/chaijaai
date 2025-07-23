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
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'chaijaai2024',
    adminEmails: ['hashimadil0001@gmail.com', 'admin@chaijaai.com']
};

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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
    // Optimized 3D Model Loading
    const modelViewer = document.querySelector('model-viewer');
    const hero3D = document.querySelector('.hero-bg-3d');
    
    if (modelViewer && hero3D) {
        // Show loading placeholder
        hero3D.style.background = 'linear-gradient(135deg, rgba(92, 64, 51, 0.1) 0%, rgba(224, 159, 62, 0.1) 100%)';
        
        // Preload the model
        modelViewer.addEventListener('load', () => {
            hero3D.classList.add('loaded');
        });
        
        // Fallback for slow connections
        setTimeout(() => {
            if (!hero3D.classList.contains('loaded')) {
                hero3D.classList.add('loaded');
            }
        }, 3000);
    }
    
    // Enhanced Scroll-based Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.story-card, .experience-card, .instagram-post');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);
    
    // Observe all fade-in-scroll elements
    document.querySelectorAll('.fade-in-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Parallax Effect for Hero Section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Create Ambient Particles
    function createAmbientParticles() {
        const sections = document.querySelectorAll('.tea-experience-section, .cinema-section, .instagram-section');
        
        sections.forEach(section => {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'ambient-particle';
                particle.innerHTML = Math.random() > 0.5 ? '🍃' : '✨';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.fontSize = (Math.random() * 0.5 + 0.8) + 'rem';
                section.appendChild(particle);
            }
        });
    }
    
    createAmbientParticles();
    
    // Load Instagram Feed (Mock Data)
    function loadInstagramFeed() {
        const instagramGrid = document.getElementById('instagramFeed');
        if (!instagramGrid) return;
        
        const mockPosts = [
            {
                image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Morning Kahwa ritual ☕✨'
            },
            {
                image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Handcrafted teaware from Kashmir 🎨'
            },
            {
                image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Sunset views from The Bund 🌅'
            },
            {
                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Traditional Noon Chai preparation 🌸'
            },
            {
                image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Artisan at work creating magic ✋'
            },
            {
                image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b3d8fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                caption: 'Cozy corner for tea lovers 🏠'
            }
        ];
        
        instagramGrid.innerHTML = '';
        
        mockPosts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post fade-in-scroll';
            postElement.style.animationDelay = `${index * 0.1}s`;
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.caption}" loading="lazy">
                <div class="post-caption" style="padding: 1rem; color: #5c4033; font-size: 0.9rem;">
                    ${post.caption}
                </div>
            `;
            
            postElement.addEventListener('click', () => {
                window.open('https://instagram.com/chaijaai', '_blank');
            });
            
            instagramGrid.appendChild(postElement);
        });
    }
    
    loadInstagramFeed();
    
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
    
    // Add animation delays to form groups
    const formGroups = document.querySelectorAll('.comment-form .form-group');
    formGroups.forEach((group, index) => {
        group.style.setProperty('--delay', `${index * 0.1}s`);
    });
    
    // Add animation delays to comments
    const comments = document.querySelectorAll('.comment');
    comments.forEach((comment, index) => {
        comment.style.setProperty('--comment-delay', `${index * 0.2}s`);
    });
    
    function checkAuthStatus() {
        const user = localStorage.getItem('chaiJaaiUser');
        if (user) {
            currentUser = JSON.parse(user);
            updateAuthButtons();
            
            // Check if user is admin
            if (ADMIN_CREDENTIALS.adminEmails.includes(currentUser.email)) {
                showAdminControls();
            }
        }
    }
    
    function showAdminControls() {
        // Add admin controls to comments
        const comments = document.querySelectorAll('.comment');
        comments.forEach((comment, index) => {
            if (!comment.querySelector('.admin-controls')) {
                const adminControls = document.createElement('div');
                adminControls.className = 'admin-controls';
                adminControls.innerHTML = `
                    <button class="admin-btn edit-btn" onclick="editComment(${index})">Edit</button>
                    <button class="admin-btn delete-btn" onclick="deleteCommentAdmin(${index})">Delete</button>
                `;
                comment.appendChild(adminControls);
            }
        });
        
        // Add admin panel link to navigation
        if (!document.querySelector('.admin-panel-link')) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.className = 'admin-panel-link';
            adminLink.textContent = 'Admin Panel';
            adminLink.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--color-saffron);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(224, 159, 62, 0.3);
                transition: all 0.3s ease;
            `;
            document.body.appendChild(adminLink);
            
            adminLink.addEventListener('mouseenter', () => {
                adminLink.style.transform = 'translateY(-2px)';
                adminLink.style.boxShadow = '0 6px 16px rgba(224, 159, 62, 0.4)';
            });
            
            adminLink.addEventListener('mouseleave', () => {
                adminLink.style.transform = 'translateY(0)';
                adminLink.style.boxShadow = '0 4px 12px rgba(224, 159, 62, 0.3)';
            });
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
    
    window.openAuthModal = openAuthModal;
    window.closeAuthModal = closeAuthModal;
    window.switchAuthForm = switchAuthForm;
    window.handleLogin = handleLogin;
    window.handleSignup = handleSignup;
    window.signInWithGoogle = signInWithGoogle;
    window.logout = logout;
    
    function signInWithGoogle() {
        // Create a more realistic Google OAuth simulation
        const googleBtn = event.target;
        const originalText = googleBtn.innerHTML;
        
        // Show loading state
        googleBtn.disabled = true;
        googleBtn.innerHTML = '<span>Opening Google...</span>';
        
        // Create a popup-like experience
        const popup = document.createElement('div');
        popup.className = 'google-auth-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <div class="popup-header">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width="20">
                    <span>Sign in with Google</span>
                    <button class="popup-close" onclick="closeGooglePopup()">&times;</button>
                </div>
                <div class="popup-body">
                    <p>Choose an account to continue to Chai Jaai</p>
                    <div class="account-option" onclick="selectGoogleAccount('hashimadil0001@gmail.com', 'Hashim Adil')">
                        <div class="account-avatar">H</div>
                        <div class="account-info">
                            <div class="account-name">Hashim Adil</div>
                            <div class="account-email">hashimadil0001@gmail.com</div>
                        </div>
                    </div>
                    <div class="account-option" onclick="selectGoogleAccount('demo@example.com', 'Demo User')">
                        <div class="account-avatar">D</div>
                        <div class="account-info">
                            <div class="account-name">Demo User</div>
                            <div class="account-email">demo@example.com</div>
                        </div>
                    </div>
                    <div class="account-option" onclick="selectGoogleAccount('user@gmail.com', 'Test User')">
                        <div class="account-avatar">T</div>
                        <div class="account-info">
                            <div class="account-name">Test User</div>
                            <div class="account-email">user@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Reset button after a short delay
        setTimeout(() => {
            googleBtn.disabled = false;
            googleBtn.innerHTML = originalText;
        }, 1000);
    }
    
    window.closeGooglePopup = function() {
        const popup = document.querySelector('.google-auth-popup');
        if (popup) {
            document.body.removeChild(popup);
        }
    }
    
    window.selectGoogleAccount = function(email, name) {
        const mockUser = {
            name: name,
            email: email,
            provider: 'google'
        };
        currentUser = mockUser;
        localStorage.setItem('chaiJaaiUser', JSON.stringify(mockUser));
        updateAuthButtons();
        closeAuthModal();
        closeGooglePopup();
        showNotification(`Successfully signed in as ${name}!`, 'success');
        
        // Check if user is admin
        if (ADMIN_CREDENTIALS.adminEmails.includes(email)) {
            showAdminControls();
            showNotification('Admin access granted!', 'success');
            
            // Add enhanced admin features
            setTimeout(() => {
                addAdvancedAdminFeatures();
            }, 1000);
        }
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
    
    window.editComment = function(index) {
        const comments = JSON.parse(localStorage.getItem('comments') || '[]');
        const comment = comments[index];
        const newText = prompt('Edit comment:', comment.text);
        if (newText && newText !== comment.text) {
            comments[index].text = newText;
            localStorage.setItem('comments', JSON.stringify(comments));
            location.reload();
        }
    }
    
    window.deleteCommentAdmin = function(index) {
        if (confirm('Are you sure you want to delete this comment?')) {
            const comments = JSON.parse(localStorage.getItem('comments') || '[]');
            comments.splice(index, 1);
            localStorage.setItem('comments', JSON.stringify(comments));
            location.reload();
        }
    }
    
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
    
    // Advanced Admin Features
    function addAdvancedAdminFeatures() {
        // Add content editing capabilities
        const editableElements = document.querySelectorAll('h1, h2, h3, p, .film-description, .story-card p');
        
        editableElements.forEach(element => {
            element.addEventListener('dblclick', function() {
                if (currentUser && ADMIN_CREDENTIALS.adminEmails.includes(currentUser.email)) {
                    makeElementEditable(element);
                }
            });
        });
        
        // Add floating admin toolbar
        const adminToolbar = document.createElement('div');
        adminToolbar.className = 'admin-toolbar';
        adminToolbar.innerHTML = `
            <div class="admin-toolbar-content">
                <button class="admin-tool-btn" onclick="toggleEditMode()" title="Toggle Edit Mode">
                    ✏️ Edit
                </button>
                <button class="admin-tool-btn" onclick="addNewSection()" title="Add Section">
                    ➕ Add
                </button>
                <button class="admin-tool-btn" onclick="saveChanges()" title="Save Changes">
                    💾 Save
                </button>
                <button class="admin-tool-btn" onclick="previewMode()" title="Preview">
                    👁️ Preview
                </button>
            </div>
        `;
        
        adminToolbar.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(224, 159, 62, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1rem;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 2000;
            animation: slideInFromBottom 0.5s ease;
        `;
        
        document.body.appendChild(adminToolbar);
    }
    
    function makeElementEditable(element) {
        const originalContent = element.innerHTML;
        const isHeading = element.tagName.match(/^H[1-6]$/);
        
        if (isHeading) {
            element.contentEditable = true;
            element.style.outline = '2px dashed var(--color-saffron)';
            element.focus();
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = element.textContent;
            textarea.style.cssText = `
                width: 100%;
                min-height: 100px;
                padding: 0.5rem;
                border: 2px solid var(--color-saffron);
                border-radius: 5px;
                font-family: inherit;
                font-size: inherit;
                resize: vertical;
            `;
            
            element.parentNode.replaceChild(textarea, element);
            textarea.focus();
            
            textarea.addEventListener('blur', function() {
                element.textContent = textarea.value;
                textarea.parentNode.replaceChild(element, textarea);
                showNotification('Content updated! Remember to save changes.', 'info');
            });
        }
        
        element.addEventListener('blur', function() {
            element.contentEditable = false;
            element.style.outline = 'none';
            if (element.innerHTML !== originalContent) {
                showNotification('Content updated! Remember to save changes.', 'info');
            }
        });
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                element.blur();
            }
        });
    }
    
    // Global admin functions
    window.toggleEditMode = function() {
        document.body.classList.toggle('admin-edit-mode');
        showNotification('Edit mode toggled! Double-click elements to edit.', 'info');
    }
    
    window.addNewSection = function() {
        const sectionType = prompt('What type of section would you like to add?\n1. Text Section\n2. Image Gallery\n3. Tea Menu Item\n\nEnter 1, 2, or 3:');
        
        switch(sectionType) {
            case '1':
                addTextSection();
                break;
            case '2':
                addImageGallery();
                break;
            case '3':
                addMenuSection();
                break;
            default:
                showNotification('Invalid selection', 'error');
        }
    }
    
    window.saveChanges = function() {
        // In a real application, this would save to a backend
        const pageContent = document.documentElement.outerHTML;
        localStorage.setItem('chaiJaaiPageContent', pageContent);
        showNotification('Changes saved locally!', 'success');
    }
    
    window.previewMode = function() {
        document.body.classList.remove('admin-edit-mode');
        showNotification('Preview mode activated', 'info');
    }
    
    function addTextSection() {
        const title = prompt('Enter section title:');
        const content = prompt('Enter section content:');
        
        if (title && content) {
            const newSection = document.createElement('section');
            newSection.className = 'custom-section fade-in-scroll';
            newSection.innerHTML = `
                <div class="section-separator wave"></div>
                <div style="padding: 4rem 2rem; background: linear-gradient(135deg, #f8f4e6 0%, #fff9f0 100%);">
                    <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                        <h2 style="color: var(--color-walnut); margin-bottom: 2rem;">${title}</h2>
                        <p style="color: #5c4033; font-size: 1.1rem; line-height: 1.6;">${content}</p>
                    </div>
                </div>
            `;
            
            // Insert before footer
            const footer = document.querySelector('footer');
            footer.parentNode.insertBefore(newSection, footer);
            
            // Animate in
            setTimeout(() => {
                newSection.classList.add('visible');
            }, 100);
            
            showNotification('New section added!', 'success');
        }
    }
    
    const defaultPhotos = [
        {
            url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Masala Chai',
            description: 'Traditional spiced tea with aromatic herbs and spices'
        },
        {
            url: 'https://images.unsplash.com/photo-1597318181409-cf64d0b3d8fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Ginger Tea',
            description: 'Fresh ginger tea with honey and lemon'
        },
        {
            url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Cardamom Tea',
            description: 'Aromatic cardamom-infused tea blend'
        },
        {
            url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Green Tea',
            description: 'Premium green tea leaves with natural antioxidants'
        },
        {
            url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Earl Grey',
            description: 'Classic Earl Grey with bergamot oil'
        },
        {
            url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            title: 'Herbal Tea',
            description: 'Caffeine-free herbal blend with chamomile'
        }
    ];
    
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