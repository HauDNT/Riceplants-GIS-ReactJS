import { Button } from '@mui/material';

function PageNotFound() {
    return (
        <div id="notfound" className="col-md-12 col-sm-12">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>
                    Trang bạn đang tìm kiếm có thể đã bị xóa do tên đã thay đổi,
                    không đủ quyền hạn truy cập
                    hoặc tạm thời không khả dụng.
                </p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.history.back()}
                    className="backhome"
                >
                    Quay lại
                </Button>
            </div>
        </div>
    );
}

export default PageNotFound;
