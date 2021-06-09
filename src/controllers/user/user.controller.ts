import {
	Controller,
	Get,
	Res,
	UseGuards,
	Request,
	Post,
	Param,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../../services/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { imageFileFilter, editFileName } from '../../utils/file-uploading.utils'
import { extname } from 'path'
const fs = require('fs')

const dirPath = "./files/"


function getCurrentFilenames() {
	console.log('current filenames: ');
	fs.readdirSync('./files').forEach(file => {
		console.log(file)
	})
}

function changeFilename(previousName, newName) {
	console.log(getCurrentFilenames())
	console.log(previousName)
	//const name = file.originalname.split('.')[0];
	const fileExtName = extname(previousName)
	let nameExt = newName + fileExtName
	fs.rename(dirPath + '/' + previousName, dirPath + '/' + nameExt, () => {
		console.log('file renamed')
	})
	console.log(getCurrentFilenames())
}


@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService
	) { }

	@UseGuards(AuthGuard('jwt'))
	@Get('profile')
	async profile(@Request() req): Promise<any> {
		let user = await this.userService.getUser(req);

		return user;
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('upload')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: './files',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter
		})
	)
	async uploadedFile(@UploadedFile() file, @Request() req) {
		let user = await this.userService.getUser(req)
		let id = user.user_id.slice(6)
		changeFilename(file.filename, id)

		const response = {
			originalname: file.originalname,
			filename: file.filename
		}
		return response;
	}

	@Get('/images/:imgpath')
	seeUploadedFile(@Param('imgpath') image, @Res() res) {
		return res.sendFile(image, { root: './files' })
	}

}
