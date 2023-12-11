// MemberCard.js
import React from "react";
import Image from "next/image";
import styles from "../../styles/dashboard/member-card.module.scss";

const MemberCard = ({ member }) => {
    return (
        <div className={styles.memberCard}>
            <Image
                src={member.imageArray[0]}
                className={styles.profilePhoto}
                alt="Profile"
								width={100}
								height={100}
           
            />
						<div className={styles.memberDetail}>{`Sex: ${member.sex}`}</div>
						<div className={styles.memberDetail}>{`Varsta: ${member.age}`}</div>
            <div className={styles.memberDetail}>{`Inaltime: ${member.height}`}</div>
						<div className={styles.memberDetail}>{`Greutate: ${member.weight}`}</div>
          
        </div>
    );
};

export default MemberCard;
