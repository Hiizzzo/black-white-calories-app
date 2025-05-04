
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSwipeNavigation = (currentRoute: string) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const minSwipeDistance = 100; // Min distance required for a swipe
    const routes = ['/', '/diary', '/profile'];
    const currentIndex = routes.indexOf(currentRoute);
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return; // Not a long enough swipe
      
      if (swipeDistance > 0 && currentIndex > 0) {
        // Swipe right (navigate to previous page)
        navigate(routes[currentIndex - 1]);
      } else if (swipeDistance < 0 && currentIndex < routes.length - 1) {
        // Swipe left (navigate to next page)
        navigate(routes[currentIndex + 1]);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate, currentRoute]);
};
