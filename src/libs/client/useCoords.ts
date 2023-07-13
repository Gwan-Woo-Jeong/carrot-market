import { useEffect, useState } from "react";

interface UseCoordsState {
  latitude: number | null;
  longitude: number | null;
}

// #12.6 useCoords

/*
  Geolocation API
  사용자의 현재 위치를 지도에 표시 혹은 위치 기반 정보 제공
  Geolocation API는 navigator.geolocation을 통해 접근 가능
  사용자의 브라우저가 위치 정보 접근 권한을 요청, 사용자가 허가할 경우 현재 장치에서 사용 가능한 최선의 방법(GPS, WiFi 등)을 통해 위치 정보 수집

  Geolocation.getCurrentPosition()
  장치의 현재 위치를 조사한 후 GeolocationPosition 객체로 반환
  ex) navigator.geolocation.getCurrentPosition(success, error, [options])

  success
  GeolocationPosition 객체를 유일한 매개변수로 받는 콜백 함수

  error: Optional
  GeolocationPositionError 객체를 유일한 매개변수로 받는 콜백 함수
 */

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}
