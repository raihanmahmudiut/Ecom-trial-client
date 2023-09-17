import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export default function WishlistHeartIcon({ inWishlist, onClick }) {
	if (inWishlist) {
		return <HeartFilled onClick={onClick} className="text-red-500 text-2xl" />;
	} else {
		return <HeartOutlined onClick={onClick} className="text-2xl text-black" />;
	}
}
