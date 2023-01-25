import { useRef } from 'react';
import style from 'components/chat/Chat/Chat.module.scss';
import { MdDone } from 'react-icons/md';
import { BsImage } from 'react-icons/bs';

interface ImgInputProps {
	img: File | null;
	setImg: React.Dispatch<React.SetStateAction<File | null>>;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type FileInputEvent = React.ChangeEvent<HTMLInputElement> | ButtonEvent;

const ImgInput = ({ img, setImg }: ImgInputProps) => {
	const imgButtonRef = useRef<HTMLInputElement>(null);

	const handleImgButton = (e: ButtonEvent) => {
		e.preventDefault();
		if (imgButtonRef.current) imgButtonRef.current.click();
	};

	const handleFile = (e: FileInputEvent) => {
		e.preventDefault();
		const currentRef = imgButtonRef.current;
		if (currentRef) {
			if (img) {
				setImg(null);
				currentRef.value = '';
			} else if (currentRef.files) setImg(currentRef.files[0]);
		}
	};

	return (
		<>
			<button
				className={style.attach}
				onClick={e => (img ? handleFile(e) : handleImgButton(e))}
			>
				{img ? <MdDone size={16} /> : <BsImage size={16} />}
			</button>
			<input
				type='file'
				id='file'
				hidden
				ref={imgButtonRef}
				onChange={e => handleFile(e)}
			/>
		</>
	);
};

export default ImgInput;
