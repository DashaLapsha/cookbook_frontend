import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/sessionSlice';
import '../../css/authentication.scss';

const SessionManager: React.FC = () => {
  const dispatch = useDispatch();
  const [isIdle, setIsIdle] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [timer, setTimer] = useState<number | null>(null);

  const handleOnIdle = () => {
    setIsIdle(true);
    setWarningVisible(true);
    startCountdown();
  };

  const handleOnActive = () => {
    setIsIdle(false);
    setWarningVisible(false);
    resetCountdown();
  };

  const handleOnAction = () => {
    resetCountdown();
  };

  const startCountdown = () => {
    if (timer) {
      clearInterval(timer);
    }
    setCountdown(30);

    const countdownTimer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimer(countdownTimer);
  };

  const resetCountdown = () => {
    setWarningVisible(false);
    setCountdown(30);
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsIdle(false);
    setWarningVisible(false);
    clearInterval(timer!);
  };

  useIdleTimer({
    timeout: 1000 * 60 * 2,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  return (
    <div>
      {warningVisible && (
        <div className="session-warning">
          <p>Click anywhere or press any key to keep your session active. You will be logged out in {countdown} seconds.</p>
        </div>
      )}
    </div>
  );
};

export default SessionManager;
