import AVFoundation
import AppKit
import Foundation

let projectRoot = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let sourceURL = projectRoot.appendingPathComponent("public/media/home-culture-montage.mp4")
let outputURL = projectRoot.appendingPathComponent("public/media/archive-culture-montage.mp4")
let posterURL = projectRoot.appendingPathComponent("public/media/archive-culture-montage-poster.jpg")

Task {
    do {
        let source = AVURLAsset(url: sourceURL)
        let duration = try await source.load(.duration)
        guard let sourceTrack = try await source.loadTracks(withMediaType: .video).first else {
            throw NSError(domain: "ArchiveMontage", code: 1, userInfo: [NSLocalizedDescriptionKey: "No video track found"])
        }

        let split = CMTime(seconds: 9.8, preferredTimescale: 600)
        let composition = AVMutableComposition()
        guard let track = composition.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else {
            throw NSError(domain: "ArchiveMontage", code: 2, userInfo: [NSLocalizedDescriptionKey: "Could not create video track"])
        }

        try track.insertTimeRange(CMTimeRange(start: split, end: duration), of: sourceTrack, at: .zero)
        let secondStart = CMTimeSubtract(duration, split)
        try track.insertTimeRange(CMTimeRange(start: .zero, end: split), of: sourceTrack, at: secondStart)
        track.preferredTransform = try await sourceTrack.load(.preferredTransform)

        try? FileManager.default.removeItem(at: outputURL)
        guard let exporter = AVAssetExportSession(asset: composition, presetName: AVAssetExportPresetHighestQuality) else {
            throw NSError(domain: "ArchiveMontage", code: 3, userInfo: [NSLocalizedDescriptionKey: "Could not create exporter"])
        }
        exporter.outputURL = outputURL
        exporter.outputFileType = .mp4
        exporter.shouldOptimizeForNetworkUse = true
        await exporter.export()
        if let error = exporter.error { throw error }

        let exportedAsset = AVURLAsset(url: outputURL)
        let generator = AVAssetImageGenerator(asset: exportedAsset)
        generator.appliesPreferredTrackTransform = true
        let image = try await generator.image(at: CMTime(seconds: 0.25, preferredTimescale: 600)).image
        let bitmap = NSBitmapImageRep(cgImage: image)
        guard let jpeg = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else {
            throw NSError(domain: "ArchiveMontage", code: 4, userInfo: [NSLocalizedDescriptionKey: "Could not create poster"])
        }
        try jpeg.write(to: posterURL)
        print("Created archive montage and poster")
        exit(EXIT_SUCCESS)
    } catch {
        fputs("\(error)\n", stderr)
        exit(EXIT_FAILURE)
    }
}

RunLoop.main.run()
