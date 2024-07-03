import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "../../styles/projects/ProjectCard.module.scss";
import Frame from "../../public/images/projects/Frame.svg";
import { FormattedMessage } from "react-intl";

Modal.setAppElement("#__next"); // Ensure accessibility for the modal

const ProjectCard = ({ title, description, type, imageUrls, reverse }) => {
	const [modalIsOpen, setIsOpen] = useState(false);

	useEffect(() => {
		Modal.setAppElement("#__next");
	}, []);

	const toggleModal = () => {
		setIsOpen(!modalIsOpen);
	};

	const cardClasses = reverse
		? `${styles.projectCard} ${styles.projectCardReverse}`
		: styles.projectCard;

	return (
		<>
			<div
				className={cardClasses}
				onClick={toggleModal}
			>
				<div className={styles.imageWrapper}>
					<Image
						alt={title}
						src={Frame}
						className={styles.decoration}
						width={100}
						height={100}
					/>
					{/* Display the first image or a placeholder if no images are provided */}
					<Image
						src={
							imageUrls && imageUrls.length > 0
								? imageUrls[0]
								: "/path/to/placeholder.jpg"
						}
						alt={title}
						className={styles.projectImage}
						width={500}
						height={500}
					/>
				</div>
				<div className={styles.textContent}>
					<h2 className={styles.projectTitle}>{title}</h2>
					<p className={styles.projectDescription}>{description}</p>
					<h3 className={styles.projectType}>{type}</h3>
					<h3 className={styles.viewMore}>
						<FormattedMessage id="projects_view_more" />
					</h3>
				</div>
			</div>

			<Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button onClick={toggleModal} className={styles.closeButton}>
          &times;
        </button>{" "}
        {/* Close button */}
        <div className={styles.modalContent}>
          {imageUrls &&
            imageUrls.map((url, index) => (
              <div key={index} className={styles.imgContainer}>
                <Image
                  src={url}
                  alt={`${title} image ${index + 1}`}
                  layout="fill"
									// height={500}
									// width={500}
                  objectFit="cover"
                  className={styles.modalImage}
                />
              </div>
            ))}
        </div>
      </Modal>
		</>
	);
};

export default ProjectCard;
