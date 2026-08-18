import "./HandProject.css";

type HandProjectProps = {
    /** Ruta del vídeo (public o import de Vite). null = pantalla vacía */
    videoSrc?: string | null;
    poster?: string;
    ariaLabel?: string;
};

export default function HandProject({
    videoSrc = null,
    poster,
    ariaLabel = "Project preview video",
}: HandProjectProps) {
    return (
        <div className="hand">
            <div className="hand__screen">
                {videoSrc ? (
                    <video
                        className="hand__video"
                        src={videoSrc}
                        poster={poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={ariaLabel}
                    />
                ) : (
                    <div className="hand__screen-placeholder" aria-hidden="true" />
                )}
            </div>

            {/* Capa superior: la mano tapa el móvil salvo la zona transparente del PNG */}
            <div className="hand__frame" aria-hidden="true" />
        </div>
    );
}
