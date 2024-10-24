import axiosInstance from '../../../common/AxiosInstance';

export const FindCoordinates = async (apiKey, address) => {
    // const geocodingAPIUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}`;
    const geocodingAPIUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=${apiKey}`;
    
    try {
        const response = (await axiosInstance.get(geocodingAPIUrl)).data;
        
        console.log(response.features);
        
        if (response.features && response.features.length > 0) {
            
            const coordinates = response.features[0].geometry.coordinates;
            console.log(`Tọa độ: ${coordinates[1]}, ${coordinates[0]}`);
            
            return coordinates;
        } else {
            console.log('Không tìm thấy tọa độ cho địa chỉ này.');
        }
    } catch (error) {
        alert('Lỗi khi tìm tọa độ!');
    }
}